import { useState } from 'react';
import classNames from 'classnames';
import { Trans } from 'next-i18next';
import { Transition } from '@headlessui/react';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';

import configuration from '~/configuration';

interface CheckoutButtonProps {
  readonly stripePriceId?: string;
  readonly recommended?: boolean;
}

interface PricingItemProps {
  selectable: boolean;
  product: {
    name: string;
    features: string[];
    description: string;
    recommended?: boolean;
    badge?: string;
  };
  plan: {
    name: string;
    stripePriceId?: string;
    price: string;
    label?: string;
    href?: string;
  };
}

const STRIPE_PRODUCTS = configuration.stripe.products;

const STRIPE_PLANS = STRIPE_PRODUCTS.reduce<string[]>((acc, product) => {
  product.plans.forEach((plan) => {
    if (plan.name && !acc.includes(plan.name)) {
      acc.push(plan.name);
    }
  });

  return acc;
}, []);

function PricingTable(
  props: React.PropsWithChildren<{
    CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
  }>
) {
  const [planVariant, setPlanVariant] = useState<string>(STRIPE_PLANS[0]);

  return (
    <div className={'flex w-full flex-col space-y-12'}>
      <div className={'flex justify-center'}>
        <PlansSwitcher
          plans={STRIPE_PLANS}
          plan={planVariant}
          setPlan={setPlanVariant}
        />
      </div>

      <div
        className={
          'flex flex-col items-start space-y-6 p-4 lg:space-y-0' +
          ' justify-center lg:flex-row lg:space-x-4 xl:space-x-6'
        }
      >
        {STRIPE_PRODUCTS.map((product, idx) => {
          const plan =
            product.plans.find((item) => item.name === planVariant) ??
            product.plans[0];

          return (
            <PricingItem
              selectable
              key={`${idx}-${plan.stripePriceId ?? plan.name}`}
              plan={plan}
              product={product}
              CheckoutButton={props.CheckoutButton}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PricingTable;

PricingTable.Item = PricingItem;
PricingTable.Price = Price;
PricingTable.FeaturesList = FeaturesList;

function PricingItem(
  props: React.PropsWithChildren<
    PricingItemProps & {
      CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
    }
  >
) {
  const recommended = props.product.recommended ?? false;

  return (
    <div
      data-cy={'subscription-plan'}
      className={classNames(
        `
         relative flex w-full sm:w-1/2 flex-col justify-between space-y-6 rounded-2xl mx-auto lg:mx-0
         p-6 lg:w-4/12 lg:p-8 xl:p-10 2xl:w-3/12 
      `,
        {
          ['bg-gradient-to-b from-logocolor-100 to-logocolor-200']: recommended,
          ['border border-gray_text-0 border-opacity-20']: !recommended,
        }
      )}
    >
      <div className={'flex flex-col space-y-1.5'}>
        <div className={'flex items-center space-x-3'}>
          <Heading type={3}>
            <span className={'font-Outfit font-semibold dark:text-white'}>
              {props.product.name}
            </span>
          </Heading>

          <If condition={props.product.badge}>
            <span
              className={classNames(
                `rounded-md px-2 py-1 font-Outfit text-xs font-medium`,
                {
                  ['bg-primary-700 text-primary-contrast']: recommended,
                  ['bg-black-36 text-gray_text-0 dark:bg-black-300 dark:text-gray-300']:
                    !recommended,
                }
              )}
            >
              {props.product.badge}
            </span>
          </If>
        </div>

        <span
          className={classNames('font-Outfit text-sm font-medium', {
            'text-primary-contrast': recommended,
            'text-gray-400': !recommended,
          })}
        >
          {props.product.description}
        </span>
      </div>

      <Transition
        show
        appear
        enter={'duration-300 relative transition-all ease-in'}
        enterFrom="opacity-0 right-1"
        enterTo="opacity-100 right-0 "
        leave={'duration-300 relative transition-all ease-out'}
        leaveFrom="opacity-100 right-0"
        leaveTo={`opacity-0 right-1`}
      >
        <div className={'flex items-end space-x-1 font-Outfit'}>
          <Price>{props.plan.price}</Price>

          <If condition={props.plan.name}>
            <span
              className={classNames(`text-lg lowercase`, {
                'text-gray-100': recommended,
                'text-gray-400 dark:text-gray-400': !recommended,
              })}
            >
              <span>/</span>
              <span>{props.plan.name}</span>
            </span>
          </If>
        </div>
      </Transition>

      <div className={'my-2.5 py-2.5 text-white'}>
        <FeaturesList features={props.product.features} />
      </div>

      <If condition={props.selectable}>
        <If
          condition={props.plan.stripePriceId && props.CheckoutButton}
          fallback={
            <DefaultCheckoutButton
              recommended={recommended}
              plan={props.plan}
            />
          }
        >
          {(CheckoutButton) => (
            <CheckoutButton
              recommended={recommended}
              stripePriceId={props.plan.stripePriceId}
            />
          )}
        </If>
      </If>
    </div>
  );
}

function FeaturesList(
  props: React.PropsWithChildren<{
    features: string[];
  }>
) {
  return (
    <ul className={'flex flex-col space-y-3'}>
      {props.features.map((feature) => {
        return (
          <ListItem key={feature}>
            <Trans
              i18nKey={`common:plans.features.${feature}`}
              defaults={feature}
            />
          </ListItem>
        );
      })}
    </ul>
  );
}

function Price({ children }: React.PropsWithChildren) {
  return (
    <div>
      <span
        className={'text-2xl font-extrabold text-white lg:text-3xl xl:text-4xl'}
      >
        {children}
      </span>
    </div>
  );
}

function ListItem({ children }: React.PropsWithChildren) {
  return (
    <li className={'flex items-center space-x-3 font-medium'}>
      <div>
        <CheckCircleIcon className={'h-6'} />
      </div>

      <span className={'text-sm'}>{children}</span>
    </li>
  );
}

function PlansSwitcher(
  props: React.PropsWithChildren<{
    plans: string[];
    plan: string;
    setPlan: (plan: string) => void;
  }>
) {
  return (
    <div
      className={
        'flex gap-2	 rounded-lg border border-gray_text-0	border-opacity-40 p-1.5 font-Outfit text-lg'
      }
    >
      {props.plans.map((plan, index) => {
        const className = classNames(
          'focus:!ring-0 !outline-none hover:bg-slate-300',
          {
            'rounded-r ': index === 1,
            'rounded-l': index === props.plans.length - 1,
            'text-gray-900 bg-white': plan === props.plan,
          }
        );

        return (
          <Button
            key={plan}
            color={plan === props.plan ? '' : 'gray_text'}
            className={className}
            onClick={() => props.setPlan(plan)}
          >
            <Trans i18nKey={`common:plans.${plan}`} defaults={plan} />
          </Button>
        );
      })}
    </div>
  );
}

function DefaultCheckoutButton(
  props: React.PropsWithChildren<{
    plan: PricingItemProps['plan'];
    recommended?: boolean;
  }>
) {
  // const linkHref = props.plan.href ?? `${configuration.paths.signUp}?utm_source=${props.plan.stripePriceId}`;
  const linkHref = props.plan.href ?? `/settings/subscription`;
  const label = props.plan.label ?? 'common:getStarted';

  return (
    <div className={'bottom-0 left-0 w-full p-0'}>
      <Button
        className={classNames({
          ['bg-primary-contrast font-Outfit font-bold text-gray-900 hover:bg-primary-contrast/90']:
            props.recommended,
          ['font-Outfit font-bold text-white hover:bg-slate-100 hover:text-white']:
            !props.recommended,
        })}
        block
        href={linkHref}
        color={props.recommended ? 'custom' : 'secondary'}
      >
        <Trans i18nKey={label} defaults={label} />
      </Button>
    </div>
  );
}
