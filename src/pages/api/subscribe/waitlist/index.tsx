import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import configuration from '~/configuration';

const MAILCHIMP_URL = `https://${configuration.mailchimp.server}.api.mailchimp.com/3.0/lists/${configuration.mailchimp.audienceId}/members`;

const Waitlist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const [first_name = null, last_name = null] = name.split(' ');

  try {
    const data = {
      first_name,
      last_name,
      email_address: email,
      status: 'subscribed',
      tags: ['waitlist'],
    };

    const fetchConfig = {
      body: JSON.stringify(data),
      headers: {
        Authorization: `apikey ${configuration.mailchimp.apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };

    const response = await fetch(MAILCHIMP_URL, fetchConfig);

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the waiting list.`,
      });
    }

    return res.status(201).json({ error: '' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

export default Waitlist;
