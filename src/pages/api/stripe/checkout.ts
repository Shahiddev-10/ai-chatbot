import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { join } from 'path';

import logger from '~/core/logger';
import { HttpStatusCode } from '~/core/generic/http-status-code.enum';

import { withAuthedUser } from '~/core/middleware/with-authed-user';
import { withPipe } from '~/core/middleware/with-pipe';
import { withMethodsGuard } from '~/core/middleware/with-methods-guard';
import { getApiRefererPath } from '~/core/generic/get-api-referer-path';

import { createStripeCheckout } from '~/lib/stripe/create-checkout';
import { canChangeBilling } from '~/lib/organizations/permissions';
import withCsrf from '~/core/middleware/with-csrf';
import { getUserRoleByOrganization } from '~/lib/server/organizations/memberships';
import configuration from '~/configuration';

const SUPPORTED_METHODS: HttpMethod[] = ['POST'];

async function checkoutsSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, firebaseUser } = req;

  const bodyResult = getBodySchema().safeParse(req.body);
  const userId = firebaseUser.uid;
  const currentOrganizationId = req.cookies.organizationId;

  const redirectToErrorPage = (val: any) => {
    const referer = getApiRefererPath(headers);
    const url = join(referer, `?error=true&type=${val}`);

    return res.redirect(url);
  };

  if (!bodyResult.success) {
    return redirectToErrorPage(`invalid-body`);
  }

  const { organizationId, priceId, customerId, returnUrl } = bodyResult.data;

  const matchesSessionOrganizationId = currentOrganizationId === organizationId;

  if (!matchesSessionOrganizationId) {
    return redirectToErrorPage(`organization-mismatch`);
  }

  const plan = getPlanByPriceId(priceId);

  // check if the plan exists in the configuration.
  if (!plan) {
    console.warn(
      `Plan not found for price ID "${priceId}". Did you forget to add it to the configuration? If the Price ID is incorrect, the checkout will be rejected. Please check the Stripe dashboard`
    );
  }

  // check the user's role has access to the checkout
  const canChangeBilling = await getUserCanAccessCheckout({
    organizationId,
    userId,
  });

  // disallow if the user doesn't have permissions to change
  // billing settings based on its role. To change the logic, please update
  // {@link canChangeBilling}
  if (!canChangeBilling) {
    logger.debug(
      {
        userId,
        organizationId,
      },
      `User attempted to access checkout but lacked permissions`
    );

    return redirectToErrorPage(`no-access`);
  }

  try {
    const trialPeriodDays =
      plan && 'trialPeriodDays' in plan
        ? (plan.trialPeriodDays as number)
        : undefined;

    const { url } = await createStripeCheckout({
      returnUrl,
      organizationId,
      priceId,
      customerId,
      trialPeriodDays,
    });

    const portalUrl = getCheckoutPortalUrl(url, returnUrl);

    // redirect user back based on the response
    res.redirect(HttpStatusCode.SeeOther, portalUrl);
  } catch (e) {
    logger.error(e, `Stripe Checkout error`);

    return redirectToErrorPage(`internal-server`);
  }
}

export default withPipe(
  withCsrf((req) => req.body.csrfToken),
  withMethodsGuard(SUPPORTED_METHODS),
  withAuthedUser,
  checkoutsSessionHandler
);

async function getUserCanAccessCheckout(params: {
  organizationId: string;
  userId: string;
}) {
  try {
    const userRole = await getUserRoleByOrganization(params);

    if (userRole === undefined) {
      return false;
    }

    return canChangeBilling(userRole);
  } catch (e) {
    logger.error(e, `Could not retrieve user role`);

    return false;
  }
}

function getBodySchema() {
  return z.object({
    organizationId: z.string().min(1),
    priceId: z.string().min(1),
    customerId: z.string().optional(),
    returnUrl: z.string().min(1),
  });
}

/**
 *
 * @param portalUrl
 * @param returnUrl
 * @description return the URL of the Checkout Portal
 * if running in emulator mode and the portal URL is undefined (as
 * stripe-mock does) then return the returnUrl (i.e. it redirects back to
 * the subscriptions page)
 */
function getCheckoutPortalUrl(portalUrl: string | null, returnUrl: string) {
  if (isTestingMode() && !portalUrl) {
    return [returnUrl, 'success=true'].join('?');
  }

  return portalUrl as string;
}

function getPlanByPriceId(priceId: string) {
  const products = configuration.stripe.products;

  type Plan = (typeof products)[0]['plans'][0];

  return products.reduce<Maybe<Plan>>((acc, product) => {
    if (acc) {
      return acc;
    }

    return product.plans.find(({ stripePriceId }) => stripePriceId === priceId);
  }, undefined);
}

/**
 * @description detect if Stripe is running in emulator mode
 */
function isTestingMode() {
  const enableStripeTesting = process.env.ENABLE_STRIPE_TESTING;

  return enableStripeTesting === 'true';
}
