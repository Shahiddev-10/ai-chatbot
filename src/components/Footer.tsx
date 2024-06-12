import Link from 'next/link';

import Container from '~/core/ui/Container';
import LogoImage from '~/core/ui/Logo/LogoImage';
import NewsletterSignup from '~/components/NewsletterSignup';
import FirebaseFirestoreProvider from '~/core/firebase/components/FirebaseFirestoreProvider';
import { useRouter } from 'next/router';

const YEAR = new Date().getFullYear();

function Footer() {
  const router = useRouter();
  return (
    <footer
      className={
        'relative z-0 bg-dark_blue-0 py-8 before:absolute before:bottom-0 before:-z-10 before:h-full  before:w-full before:bg-bottom-img before:bg-cover before:bg-top before:bg-no-repeat before:content-[""]  	1xs:pb-0 sm:pb-0 lg:py-24 lg:pb-0'
      }
      id="contact-us"
    >
      <Container>
        <div
          className={
            'flex flex-col items-center gap-5 space-y-8 px-5 pb-5 sm:px-0 md:flex-row lg:flex-row lg:space-y-0'
          }
        >
          <div
            className={
              'flex w-full justify-center space-x-2 md:w-[25%] lg:w-4/12 xl:w-3/12' +
              ' xl:space-x-6 2xl:space-x-8'
            }
          >
            <div
              className={
                'footer-logo mr-0 flex flex-col justify-start space-y-4 pb-10 md:mr-0 lg:mr-0'
              }
            >
              <div>
                <LogoImage className={'w-[80px] md:w-[115px]'} />
                <div className="logo-svg mt-3 1xs:text-center sm:text-center md:text-left">
                  <p className="font-Outfit text-base capitalize text-white">
                    Have any queries?
                  </p>
                  <Link
                    href={'mailto:hello@withai.tawk'}
                    className="relative bg-gradient-to-br from-logocolor-100 to-logocolor-200 bg-clip-text font-Outfit text-lg font-medium text-transparent  after:absolute after:bottom-0 after:right-0 after:block after:h-[2px] after:w-full after:bg-gradient-to-br after:from-logocolor-100 after:to-logocolor-200"
                  >
                    hello@withai.tawk
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              'block w-full justify-evenly md:flex'
              // 'flex flex-col items-center space-y-8 lg:space-x-6 lg:space-y-0' +
              // ' xl:space-x-16 2xl:space-x-20' +
              // ' w-full lg:flex-row lg:justify-end' +
              // ' sm:flex-row sm:flex-wrap'
            }
          >
            <div className="mb-5 flex w-full justify-start gap-20 md:m-0 md:w-2/5 md:justify-evenly md:gap-10">
              <div className=" m-0">
                <div className={'flex flex-row flex-wrap	 space-y-4'}>
                  <h5
                    className={
                      'flex-100 font-Outfit text-lg font-semibold text-white md:text-base lg:text-lg'
                    }
                  >
                    Quick Links
                  </h5>

                  <FooterSectionList>
                    <FooterLink>
                      <Link
                        href={'/#home'}
                        className="text-gray_text-0 hover:text-white"
                        onClick={(e) => {
                          if (!router.asPath.includes('/legal')) {
                            e.preventDefault();
                            document?.querySelector('#home')?.scrollIntoView({
                              behavior: 'smooth',
                            });
                          }
                        }}
                      >
                        Home
                      </Link>
                    </FooterLink>
                    {/* <FooterLink>
                      <Link
                        href={'/#about'}
                        className="text-gray_text-0 hover:text-white"
                        onClick={(e) => {
                          if (!router.asPath.includes('/legal')) {
                            e.preventDefault();
                            document?.querySelector('#about')?.scrollIntoView({
                              behavior: 'smooth',
                            });
                          }
                        }}
                      >
                        About
                      </Link>
                    </FooterLink> */}
                    <FooterLink>
                      <Link
                        href={'/#how-it-works'}
                        className="text-gray_text-0 hover:text-white"
                        onClick={(e) => {
                          if (!router.asPath.includes('/legal')) {
                            e.preventDefault();
                            document
                              ?.querySelector('#how-it-works')
                              ?.scrollIntoView({
                                behavior: 'smooth',
                              });
                          }
                        }}
                      >
                        How It Works
                      </Link>
                    </FooterLink>
                    <FooterLink>
                      <Link
                        href={'/#features'}
                        className="text-gray_text-0 hover:text-white"
                        onClick={(e) => {
                          if (!router.asPath.includes('/legal')) {
                            e.preventDefault();
                            document
                              ?.querySelector('#features')
                              ?.scrollIntoView({
                                behavior: 'smooth',
                              });
                          }
                        }}
                      >
                        Features
                      </Link>
                    </FooterLink>
                  </FooterSectionList>
                  <FooterSectionList>
                    <FooterLink>
                      <Link
                        href={'/#pricing'}
                        className="text-gray_text-0 hover:text-white"
                        onClick={(e) => {
                          if (!router.asPath.includes('/legal')) {
                            e.preventDefault();
                            document
                              ?.querySelector('#pricing')
                              ?.scrollIntoView({
                                behavior: 'smooth',
                              });
                          }
                        }}
                      >
                        Pricing
                      </Link>
                    </FooterLink>
                    <FooterLink>
                      <Link
                        href={'/#faqs'}
                        className="text-gray_text-0 hover:text-white"
                        onClick={(e) => {
                          if (!router.asPath.includes('/legal')) {
                            e.preventDefault();
                            document?.querySelector('#faqs')?.scrollIntoView({
                              behavior: 'smooth',
                            });
                          }
                        }}
                      >
                        FAQs
                      </Link>
                    </FooterLink>
                    <FooterLink>
                      <Link
                        href={'/#contact-us'}
                        className="text-gray_text-0 hover:text-white"
                        onClick={(e) => {
                          if (!router.asPath.includes('/legal')) {
                            e.preventDefault();
                            document
                              ?.querySelector('#contact-us')
                              ?.scrollIntoView({
                                behavior: 'smooth',
                              });
                          }
                        }}
                      >
                        Contact Us
                      </Link>
                    </FooterLink>
                  </FooterSectionList>
                </div>
              </div>
            </div>

            <div className="mb-5 flex w-full justify-start md:m-0 md:w-1/5">
              <div className={'flex flex-col space-y-4'}>
                <h5
                  className={
                    'font-Outfit text-lg font-semibold text-white md:text-base lg:text-lg'
                  }
                >
                  Legal Links
                </h5>

                <FooterSectionList>
                  <FooterLink>
                    <Link
                      href={'/legal'}
                      className="text-gray_text-0 hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link
                      href={'/legal'}
                      className="text-gray_text-0 hover:text-white"
                    >
                      T & C
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link
                      href={'/legal'}
                      className="text-gray_text-0 hover:text-white"
                    >
                      Refund Policy
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link
                      href={'/legal'}
                      className="text-gray_text-0 hover:text-white"
                    >
                      Support
                    </Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div className="w-full md:w-1/3 lg:w-2/5">
              <h5
                className={
                  'font-Outfit text-lg font-semibold text-white md:text-base lg:text-lg'
                }
              >
                Subscribe to Newsletter
              </h5>
              <FirebaseFirestoreProvider>
                <NewsletterSignup />
              </FirebaseFirestoreProvider>
            </div>
          </div>
        </div>
      </Container>
      <div
        className={
          'mt-5 flex justify-center bg-gradient-to-br from-logocolor-100 to-logocolor-200 px-5 py-5 font-Outfit text-base font-normal text-white 1xs:text-center'
        }
      >
        <p className="text-white">
          Copyright © {YEAR}{' '}
          <Link href="/" className="cursor-pointer underline">
            Tawk<span className="text-[#fa9d00] underline">With</span>.ai
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterSectionList(props: React.PropsWithChildren) {
  return (
    <ul
      className={
        'flex flex-10 flex-col space-y-4 text-gray-500 dark:text-gray-400'
      }
    >
      {props.children}
    </ul>
  );
}

function FooterLink(props: React.PropsWithChildren) {
  return (
    <li
      className={
        'font-Outfit text-base font-normal text-white md:text-sm lg:text-base'
      }
    >
      {props.children}
    </li>
  );
}

export default Footer;
