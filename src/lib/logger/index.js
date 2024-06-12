// NOTE UPDATE LOGFLARE KEY IF YOU WANT TO USE
import pino from 'pino';
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare';

// create pino-logflare stream
const stream = createWriteStream({
  apiKey: 'UPDATE',
  sourceToken: 'TO UPDATE',
});

// create pino-logflare browser stream
const send = createPinoBrowserSend({
  apiKey: 'mw1Upn87EU0x',
  sourceToken: 'b1b334ff-686c-472d-8fd7-XXXXXXXXXXXX',
});

// create pino loggger
const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
  },
  stream
);

export default logger;
// log some events
// logger.info('Informational message');
// logger.error(new Error('things got bad'), 'error message');

// const child = logger.child({ property: 'value' });
// child.info('hello child!');
