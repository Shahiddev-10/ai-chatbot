import { LayoutStyle } from '~/core/layout-style';
import { GoogleAuthProvider } from 'firebase/auth';

const CONTACT_EMAIL = `contact@withai.tawk`;

const configuration = {
  site: {
    name: 'withai.tawk',
    description: 'withai.tawk',
    contactEmail: CONTACT_EMAIL,
    themeColor: '#ffffff',
    themeColorDark: '#0a0a0a',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
    siteName: 'withai.tawk',
    twitterHandle: '',
    githubHandle: '',
    language: 'en',
    convertKitFormId: '',
    locale: process.env.DEFAULT_LOCALE,
    imageUrl: 'https://twakaimvp.netlify.app/assets/images/metatag.jpg',
  },
  dataset: {
    maxFileSize: 20000000, // 20 mb
  },
  engine: {
    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PRIVATE_KEY: process.env.SUPABASE_PRIVATE_KEY,
    maxTokens: 3000,
    chunkSize: 1000,
    chunkOverlap: 500,
    temperature: 0,
    kValue: 3,
    openAIModel: 'gpt-3.5-turbo',
    userUploadedFilesDirectory: './public/userUploadedFiles',
  },
  workspace: {
    status: {
      ONGOING: 'ONGOING',
      COMPLETED: 'COMPLETED',
      DELETED: 'DELETED',
    },
    roles: {
      OWNER: 'OWNER',
    },
  },
  iframeDomain: process.env.NEXT_PUBLIC_CHATBOT_IFRAME_DOMAIN,
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  mailchimp: {
    apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
    server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER,
    audienceId: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
  },
  auth: {
    // Enable MFA. You must upgrade to GCP Identity Platform to use it.
    // see: https://cloud.google.com/identity-platform/docs/product-comparison
    enableMultiFactorAuth: false,
    // When enabled, users will be required to verify their email address
    // before being able to access the app
    requireEmailVerification:
      process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION === 'true',
    // NB: Enable the providers below in the Firebase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      oAuth: [GoogleAuthProvider],
    },
  },
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'development',
  emulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST,
  emulator: process.env.NEXT_PUBLIC_EMULATOR === 'true',
  production: process.env.NODE_ENV === 'production',
  enableThemeSwitcher: true,
  paths: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    emailLinkSignIn: '/auth/link',
    onboarding: `/onboarding`,
    // appHome: '/dashboard',
    appHome: '/my-chatbots',
    myChatbots: '/my-chatbots',
    settings: {
      profile: '/settings/profile',
      authentication: '/settings/profile/authentication',
      email: '/settings/profile/email',
      password: '/settings/profile/password',
    },
    api: {
      checkout: `/api/stripe/checkout`,
      billingPortal: `/api/stripe/portal`,
    },
    searchIndex: `/public/search-index`,
  },
  navigation: {
    style: LayoutStyle.Sidebar,
  },
  appCheckSiteKey: process.env.NEXT_PUBLIC_APPCHECK_KEY,
  email: {
    host: '',
    port: 587,
    user: '',
    password: '',
    senderAddress: 'Samip Shah <samipshah@gmail.com>',
  },
  emailEtherealTestAccount: {
    email: process.env.ETHEREAL_EMAIL,
    password: process.env.ETHEREAL_PASSWORD,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  stripe: {
    products: [
      {
        name: 'Basic',
        description: 'Description of your Basic plan',
        badge: `2000 Messages Per Month`,
        features: [
          '2000 Messages Per Month',
          'Unlimited Number of Chatbots',
          'Number of Websites I can embed My Widget On: 5',
          'Number of Files that can be Uploaded: 50',
          'Total File Upload Size I can Upload: 100',
          'Number Of URLs Supported: 50',
          'Custom Server Deployment: No',
          'API Access: No',
          'Mobile App: No',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$9',
            stripePriceId: 'price_1NXmRuSJIUGZFS1wrU0oshiY',
          },
          {
            name: 'Yearly',
            price: '$90',
            stripePriceId: 'price_1NXmhwSJIUGZFS1wWptZEvOL',
          },
        ],
      },
      {
        name: 'Professional',
        badge: `Most Popular`,
        recommended: true,
        description: 'Description of your Pro plan',
        features: [
          '5000 Messages Per Month',
          'Unlimited Number of Chatbots',
          'Number of Websites I can embed My Widget On: 10',
          'Number of Files that can be Uploaded: 100',
          'Total File Upload Size I can Upload: 300 MB',
          'Number Of URLs Supported: 200',
          'Custom Server Deployment: No',
          'API Access: No',
          'Mobile App: No',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$29',
            stripePriceId: 'price_1NXmVsSJIUGZFS1wHNUv55yy',
          },
          {
            name: 'Yearly',
            price: '$200',
            stripePriceId: 'price_1NXmiRSJIUGZFS1wF6KjyHpE',
          },
        ],
      },
      {
        name: 'Enterprise',
        description: 'Description of your enterprise plan',
        badge: ``,
        features: [
          'Unlimited Messages Per Month',
          'Unlimited Number of Chatbots',
          'Unlimited Number of Websites I can embed My Widget On',
          'Unlimited Number of Files that can be Uploaded',
          'Unlimited Total File Upload Size I can Upload',
          'Unlimited Number Of URLs Supported',
          'Custom Server Deployment: Yes',
          'API Access: Yes',
          'Mobile App: Yes',
        ],
        plans: [
          {
            name: '',
            price: 'Contact us',
            stripePriceId: '',
            label: `Contact us`,
            href: `mailto: ${CONTACT_EMAIL}`,
          },
        ],
      },
    ],
  },
  isFreePlanSupported: true,
  freePlanTrialDays: 14,
};

export default configuration;
