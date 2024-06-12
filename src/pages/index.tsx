import Image from 'next/image';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';

import type { GetStaticPropsContext } from 'next';

import {
  ChevronDownIcon,
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline';

import { withTranslationProps } from '~/lib/props/with-translation-props';

import Layout from '~/core/ui/Layout';
import Container from '~/core/ui/Container';
import Footer from '~/components/Footer';
import SiteHeader from '~/components/SiteHeader';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import SlideUpTransition from '~/core/ui/SlideUpTransition';
import PricingTable from '~/components/PricingTable';
import JoinWaitlistForm from '~/components/newsletter/JoinWaitlistForm';
import FirebaseFirestoreProvider from '~/core/firebase/components/FirebaseFirestoreProvider';
import { useRouter } from 'next/router';
import configuration from '~/configuration';
import { images } from 'src/constants';
import Script from 'next/script';

const Index = () => {
  return <LandingPage />;
};

export default Index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });

  return {
    props,
  };
}

const LandingPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <div id="home" className={'header-background pb-12 '}>
        <SiteHeader />

        <Container>
          <SlideUpTransition>
            <div
              className={
                'container mx-auto my-12 mb-0 pt-12 1xs:mt-0 1xs:pt-6 sm:pt-6 lg:mt-12 lg:!pl-0'
              }
            >
              <div
                className={
                  'grid grid-cols-2 gap-6 1xs:flex  1xs:flex-col-reverse sm:flex  sm:flex-col-reverse md:grid md:gap-2'
                }
              >
                {/* img-blur1 */}
                <div
                  className={
                    'img-blur1 relative flex flex-col justify-start p-3  text-6xl lg:p-6 lg:pl-0 xl:pl-0 '
                  }
                >
                  <HeroTitle>
                    <span>Empower Your Business with a</span>
                    <span
                      className={
                        'bg-gradient-to-br bg-clip-text text-transparent' +
                        ' from-logocolor-100 to-logocolor-200' +
                        ' from-logocolor-100 font-Outfit font-black leading-[1.2]'
                      }
                    >
                      {' '}
                      Custom Chatbot{' '}
                    </span>
                    <span>in Minutes</span>
                  </HeroTitle>
                  <p
                    className={
                      'pb-8 pt-6 font-Outfit leading-7 text-gray-300 1xs:text-center	 1xs:text-base sm:text-center sm:text-base md:text-left lg:text-[20px]'
                    }
                  >
                    Maximize your customer engagement and streamline support
                    requests with our easy-to-use chatbot creator. No coding
                    skills required! Get started today and discover the power of
                    instant customer support.
                  </p>

                  <Button
                    variant={'normal'}
                    size={'normal'}
                    className={
                      'group h-[60px] rounded-lg border border-btncolor-0 transition delay-75 ease-linear	hover:bg-btncolor-0	hover:shadow-btn-shadow 1xs:place-self-center sm:place-self-center md:place-self-start'
                    }
                    type="button"
                    onClick={() => router.push(configuration.paths.signUp)}
                  >
                    <span
                      className={
                        'text-bg-btncolor-0 flex items-center space-x-2	font-Outfit text-lg font-medium group-hover:text-black-700'
                      }
                    >
                      <span>Build Your Chatbot</span>

                      <ArrowSmallRightIcon
                        className={'hidden h-6	group-hover:block'}
                      />
                    </span>
                  </Button>
                </div>
                <div
                  className={
                    'img-blur relative flex flex-col  justify-center p-6'
                  }
                >
                  <Image
                    priority
                    className={
                      'relative mx-auto before:absolute before:bg-[#092145] before:blur-lg'
                    }
                    width={510}
                    height={1649}
                    src={`/assets/images/chat/Group-393.png`}
                    alt={`App Image`}
                  />
                </div>

                {/* 
                  <div className={'flex items-center space-x-4'}>
                    <Button round href={'/auth/sign-up'}>
                      <span className={'flex items-center space-x-2'}>
                        <span>Get Started</span>
                        <ChevronRightIcon className={'h-3'} />
                      </span>
                    </Button>

                    <Button round color={'secondary'} href={'/pricing'}>
                      <span className={'flex items-center space-x-2'}>
                        <span>View Pricing</span>
                      </span>
                    </Button>
                  </div> 
                */}
              </div>
            </div>

            {/*
              <div className={'flex justify-center py-12'}>
                  <Image
                    priority
                    className={
                      'hero-image-shadow rounded-2xl' +
                      ' shadow-primary-500/40 dark:shadow-primary-500/30'
                    }
                    width={2688}
                    height={1824}
                    src={`/assets/images/dashboard-dark.webp`}
                    alt={`App Image`}
                  />
              </div> 
              */}
          </SlideUpTransition>
        </Container>
        <BlendUpperWithBottom />
      </div>

      {/* <div
        className="about-background bg-dark_blue-0 bg-[url('/assets/images/bg-bottom.png')] bg-contain bg-bottom bg-no-repeat pb-5 1xs:bg-cover sm:bg-cover md:bg-contain"
        id="about"
      >
        <Container>
          <div
            className={
              'flex h-full flex-1 flex-col px-5 py-10 sm:px-0 md:flex-row '
            }
          >
            <div
              className={
                'flex w-full flex-1 flex-col justify-center space-y-12'
              }
            >
              <div className="relative z-10 flex justify-center">
                <h1
                  className={
                    'flex flex-row  text-center font-Outfit text-7xl font-bold text-white 1xs:block 1xs:text-4xl sm:block sm:text-4xl lg:text-left xl:text-7xl 2xl:text-7xl'
                  }
                >
                  <span>Demo of </span>
                  <span
                    className={
                      'bg-gradient-to-br bg-clip-text text-transparent' +
                      ' from-logocolor-100 to-logocolor-200' +
                      ' to-logocolor-200'
                    }
                  >
                    Tawk
                  </span>
                  <span>With</span>
                  <span
                    className={
                      'bg-gradient-to-br bg-clip-text text-transparent' +
                      ' from-logocolor-100 to-logocolor-200' +
                      ' to-logocolor-200'
                    }
                  >
                    .ai
                  </span>
                </h1>
              </div>
              <div className={'flex flex-col'}>
                <div
                  className={
                    'relative z-0 h-full w-full justify-center sm:mb-9 sm:w-full lg:flex'
                  }
                >
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=D0UnqGm_miA"
                    width="1000px"
                    height="560px"
                    playing
                    controls
                    playIcon={
                      <Image
                        alt={`App Image`}
                        src={images.playIcon}
                        width={90}
                        height={90}
                        className="play-icon"
                      />
                    }
                    light="/assets/images/video-placeholder.png"
                    className="react-player"
                    playsinline
                    muted
                  />
                </div>
                <div
                  className={
                    'flex w-full  flex-col justify-center px-8 1xs:px-0 sm:block sm:px-0 md:flex md:px-8'
                  }
                >
                  <div
                    className={
                      'flex flex-col items-center justify-center gap-5 pb-5 pt-2 font-Outfit text-sm/[20px] leading-7 text-gray-300 sm:text-center'
                    }
                  >
                    <p className="text-xl text-white 1xs:text-center 1xs:text-base sm:text-center sm:text-base">
                      Yeah, It’s easy to integrate on your website, Right?
                      <br />
                      So what are you waiting for? Hurry up and
                    </p>

                    <Button
                      variant={'normal'}
                      size={'normal'}
                      className={
                        'group h-[60px] rounded-lg border border-btncolor-0 transition delay-75 ease-linear	hover:bg-btncolor-0	hover:shadow-btn-shadow'
                      }
                      type="button"
                      onClick={() => router.push(configuration.paths.signUp)}
                      id="demo-button"
                    >
                      <span
                        className={
                          'text-bg-btncolor-0 flex items-center space-x-2	font-Outfit text-lg font-medium group-hover:text-black-700'
                        }
                      >
                        <span>Build Your Chatbot</span>
                        <ArrowSmallRightIcon
                          className={'hidden h-6	group-hover:block'}
                        />
                      </span>
                    </Button>
                  </div>

                  <div
                    className={
                      'space-y-2 md:items-start lg:flex-row lg:space-x-4 lg:space-y-0'
                    }
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div> */}
      {/* <BlendUpperWithBottom /> */}
      <div className={'set-background pb-5'} id="how-it-works" data-section>
        <Container>
          <div
            className={
              'relative z-10 flex flex-col items-center justify-center space-y-0 py-10'
            }
          >
            <div
              className={
                'flex max-w-3xl flex-col items-center space-y-4 text-center'
              }
            >
              <h1
                className={
                  'flex flex-row space-x-2 text-center font-Outfit text-7xl font-bold text-white 1xs:block 1xs:text-4xl sm:block sm:text-4xl lg:text-left xl:text-7xl 2xl:text-7xl'
                }
              >
                <span>Get Started in</span>
                <span
                  className={
                    'bg-gradient-to-br bg-clip-text text-transparent' +
                    ' from-logocolor-100 to-logocolor-200' +
                    ' to-logocolor-200'
                  }
                >
                  {' '}
                  60
                </span>
                <span>Seconds!</span>
              </h1>
            </div>
            <div>
              <div
                className={
                  'grid gap-12 px-5 py-10 md:grid-cols-2 lg:grid-cols-4'
                }
              >
                <div className={'group flex flex-col space-y-3 text-center'}>
                  <FeatureIcon>
                    <svg
                      width="60"
                      height="44"
                      viewBox="0 0 60 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29.9838 43.9989C22.1202 43.9989 14.2567 44.0051 6.39317 43.9958C3.28013 43.9927 0.811488 42.0571 0.15775 39.112C0.0425677 38.5902 0.0145499 38.0407 0.0114369 37.5067C0.00209778 32.629 -0.00723962 27.7544 0.00832557 22.8767C0.0176647 19.6506 1.92595 17.1994 4.92381 16.5419C5.47171 16.4215 6.04762 16.3875 6.61108 16.3875C14.2692 16.3783 21.9303 16.3814 29.5884 16.3814C29.8157 16.3814 30.0429 16.3844 30.2671 16.4153C31.2508 16.5542 31.9294 17.3322 31.8858 18.2614C31.8391 19.1937 31.0982 19.9347 30.1176 19.9686C29.2584 19.9995 28.3961 19.9779 27.5338 19.981C20.5544 19.981 13.5749 19.981 6.59552 19.981C4.66543 19.981 3.62567 21.0152 3.62567 22.9415C3.62256 27.7945 3.62256 32.6506 3.62567 37.5036C3.62567 39.3775 4.67477 40.4271 6.57684 40.4271C22.1887 40.4333 37.8037 40.4333 53.4156 40.4271C55.3395 40.4271 56.3699 39.3682 56.3699 37.4387C56.373 34.1355 56.3668 30.8323 56.373 27.529C56.3761 26.5072 56.9645 25.7693 57.8486 25.6335C58.9319 25.4668 59.8534 26.1305 59.9499 27.2234C60.0184 27.9828 59.9872 28.7484 59.9903 29.5141C59.9935 32.2091 60.0121 34.9073 59.9872 37.6054C59.9561 40.8902 57.9264 43.3475 54.7916 43.9125C54.3059 43.9989 53.7985 43.9989 53.3035 43.9989C45.5272 43.9989 37.757 43.9989 29.9838 43.9989Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M59.981 12.2375C59.953 19.023 54.4211 24.4626 47.5755 24.4348C40.7984 24.407 35.2852 18.8872 35.3101 12.1572C35.335 5.43652 40.8918 -0.021546 47.6907 6.39492e-05C54.4958 0.0185868 60.009 5.51061 59.981 12.2375ZM47.6502 20.8537C52.4132 20.863 56.3512 16.9762 56.3667 12.2498C56.3823 7.49255 52.4474 3.57189 47.6533 3.57189C42.8717 3.57189 38.968 7.43699 38.9555 12.1788C38.9431 16.967 42.8312 20.8444 47.6502 20.8537Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M44.3412 27.6387C45.7826 27.6387 46.9344 28.7747 46.9344 30.1979C46.9344 31.6087 45.7608 32.7726 44.3412 32.7757C42.9248 32.7757 41.7449 31.6087 41.7481 30.201C41.7481 28.7809 42.9061 27.6387 44.3412 27.6387Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.6358 27.6387C17.0771 27.6325 18.232 28.7593 18.2445 30.1825C18.2569 31.5841 17.0833 32.7634 15.6669 32.7726C14.2505 32.7819 13.0706 31.6242 13.0582 30.2134C13.0488 28.7964 14.1975 27.6449 15.6358 27.6387Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30.0305 27.6427C31.4719 27.655 32.5988 28.7973 32.5832 30.2328C32.5708 31.6405 31.3816 32.7951 29.962 32.7766C28.5425 32.7581 27.3938 31.585 27.4093 30.168C27.4249 28.7417 28.5798 27.6303 30.0305 27.6427Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M46.3896 11.9993C47.6535 10.9929 48.8426 10.0266 50.0536 9.08505C50.7509 8.54171 51.5261 8.50775 52.2016 8.93378C52.8273 9.32893 53.1822 10.0637 52.9674 10.7984C52.8491 11.2028 52.5845 11.6289 52.2608 11.8974C50.6482 13.2403 49.0014 14.5431 47.3484 15.8397C46.3522 16.6208 45.3654 16.4911 44.5622 15.5063C43.9489 14.7561 43.3481 13.9967 42.7567 13.228C42.0438 12.2988 42.1278 11.2337 42.9497 10.5885C43.7777 9.94018 44.886 10.1285 45.6331 11.0485C45.8728 11.3448 46.1094 11.6443 46.3896 11.9993Z"
                        fill="white"
                      />
                    </svg>
                  </FeatureIcon>

                  <Heading type={3}>1. Login With Your Account</Heading>

                  <div className={'font-Outfit font-light text-gray_text-0 '}>
                    Sign up for a free account with your email.
                  </div>
                </div>

                <div className={'group flex flex-col space-y-3 text-center'}>
                  <FeatureIcon>
                    <svg
                      width="60"
                      height="40"
                      viewBox="0 0 60 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28.7086 4.39554C30.2201 3.42641 31.5706 2.35613 33.0839 1.62238C42.8628 -3.12583 54.2923 3.02735 55.8367 13.8478C56.0087 15.0579 55.9025 16.3065 55.9703 17.535C55.9867 17.8421 56.0983 18.2135 56.2996 18.4305C59.6922 22.0956 60.8634 26.362 59.3482 31.136C57.813 35.9743 54.3746 38.8449 49.4119 39.8232C48.7203 39.9593 47.9993 39.9906 47.2911 39.9906C35.7464 39.9998 24.2034 40.0034 12.6587 39.9961C5.32452 39.9924 -0.474388 33.8889 0.0306606 26.5349C0.3637 21.6855 2.85783 18.1492 7.17819 15.9461C7.57528 15.7438 7.72716 15.5305 7.76009 15.0799C8.21025 8.83113 13.495 3.33262 19.6855 2.57681C22.9719 2.17591 26.0169 2.81219 28.7086 4.39554ZM29.9255 37.1586C35.675 37.1586 41.4227 37.1586 47.1722 37.1586C47.2161 37.1586 47.2582 37.1586 47.3021 37.1586C49.6773 37.1696 51.7908 36.4175 53.606 34.8874C58.2869 30.9392 58.3509 23.9879 53.7488 19.9146C53.1559 19.3905 52.9802 18.8388 53.0498 18.0352C53.1614 16.7516 53.2602 15.4201 53.0479 14.1623C52.1385 8.78332 49.0862 5.06493 43.9022 3.45767C38.7529 1.86145 34.1745 3.16711 30.372 7.04549C29.5065 7.9282 29.016 7.97417 27.9492 7.27169C24.3224 4.87735 20.4943 4.53531 16.6241 6.49013C12.7465 8.44863 10.7282 11.7569 10.5232 16.1061C10.4702 17.226 10.0877 17.8145 9.04101 18.208C4.77921 19.8079 2.15699 24.4311 2.92371 28.8556C3.77461 33.7602 7.73082 37.1402 12.6843 37.1549C18.4265 37.1714 24.176 37.1586 29.9255 37.1586Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M31.3875 19.7827C31.3875 20.8088 31.3875 21.6474 31.3875 22.4859C31.3875 24.5842 31.3911 26.6843 31.3856 28.7826C31.3838 29.8069 30.8403 30.4579 29.9949 30.4726C29.1294 30.4891 28.564 29.8197 28.5621 28.7605C28.5585 26.0333 28.5603 23.3061 28.5603 20.5808C28.5603 20.373 28.5603 20.1652 28.5603 19.9574C28.4889 19.9096 28.4194 19.8636 28.348 19.8158C28.2218 20.0089 28.1193 20.2277 27.9638 20.3932C26.8969 21.5242 25.8301 22.6551 24.7395 23.7622C24.1503 24.3617 23.3341 24.3782 22.7669 23.8578C22.1868 23.3264 22.1374 22.4528 22.7266 21.8276C24.7852 19.6447 26.8585 17.4748 28.9446 15.3177C29.5631 14.6777 30.3847 14.6851 31.0087 15.3287C33.0801 17.4692 35.1387 19.6245 37.1845 21.789C37.7811 22.4197 37.7646 23.2822 37.2102 23.8247C36.6283 24.3948 35.7828 24.3599 35.1424 23.7015C33.9292 22.451 32.7269 21.184 31.3875 19.7827Z"
                        fill="white"
                      />
                    </svg>
                  </FeatureIcon>

                  <Heading type={3}>2. Upload Your Documents</Heading>

                  <div className={'font-Outfit font-light text-gray_text-0 '}>
                    Upload your documents or enter your website URL to train
                    your chatbot
                  </div>
                </div>

                <div className={'group flex flex-col space-y-3 text-center'}>
                  <FeatureIcon>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M31.106 39.668C30.9328 39.9108 30.824 40.1238 30.6607 40.2872C25.3864 45.5729 20.1121 50.8585 14.8328 56.1391C11.9483 59.0271 8.34134 59.0321 5.46174 56.154C4.95212 55.6438 4.43755 55.1385 3.93288 54.6233C1.40952 52.0176 1.41446 48.3172 3.96256 45.7363C6.6492 43.0217 9.35563 40.3318 12.0522 37.6321C14.719 34.962 17.3859 32.287 20.0576 29.6219C20.2061 29.4733 20.3892 29.3544 20.6168 29.181C19.8202 28.3884 19.1027 27.6751 18.3853 26.9568C17.4848 26.0552 16.5992 25.1438 15.6789 24.267C15.4711 24.0688 15.1396 23.9152 14.8575 23.9053C12.6113 23.831 10.365 23.8211 8.12364 23.7319C7.69813 23.7121 7.18851 23.509 6.8768 23.2168C5.91198 22.3003 4.96697 21.3492 4.11595 20.3238C2.86911 18.8228 1.71628 17.2475 0.523866 15.702C0.484284 15.6524 0.434805 15.6029 0.415014 15.5484C-0.153979 13.988 -0.0995533 12.383 0.345746 10.8374C0.5585 10.1043 1.53816 9.99531 2.31991 10.456C3.87351 11.3675 5.437 12.2592 6.96092 13.2202C7.96531 13.8543 8.94991 13.7998 9.89988 13.24C11.2853 12.4226 12.1066 11.1495 12.4628 9.60395C12.6657 8.71723 12.2897 7.94446 11.597 7.40946C10.6618 6.68622 9.67229 6.02739 8.67778 5.37845C7.82677 4.82363 6.93617 4.32827 6.06536 3.80317C4.89769 3.09975 4.90759 1.8514 6.10495 1.19751C8.2127 0.0383461 10.5085 -0.164762 12.8339 0.107692C15.763 0.449498 18.4694 1.45511 20.879 3.179C21.4579 3.59511 21.9625 4.12515 22.4722 4.63043C23.5359 5.68062 23.625 7.08253 23.813 8.44976C24.0752 10.3421 24.3325 12.2294 24.6096 14.1168C24.6393 14.3298 24.7432 14.5725 24.8966 14.7261C26.5046 16.3559 28.1275 17.9708 29.7503 19.5906C29.7899 19.6303 29.8542 19.655 29.9383 19.7095C30.1214 19.5362 30.3045 19.3677 30.4777 19.1894C35.1385 14.523 39.7943 9.8467 44.4749 5.20012C44.8311 4.84841 45.3358 4.55612 45.8157 4.43227C49.4523 3.52574 53.0989 2.66878 56.7404 1.79692C58.1555 1.46007 58.9817 2.29229 58.6206 3.70905C57.7003 7.32031 56.7899 10.9365 55.835 14.5428C55.7113 15.0085 55.4193 15.4791 55.0779 15.8209C50.4172 20.522 45.7366 25.1982 41.0609 29.8795C40.8977 30.043 40.7443 30.2114 40.5365 30.4343C42.1544 32.0443 43.7426 33.6344 45.3506 35.1998C45.5139 35.3583 45.8009 35.4177 46.0433 35.4524C48.3045 35.7794 50.5705 36.1113 52.8366 36.4035C53.94 36.5472 54.8405 37.0574 55.6222 37.8005C57.5964 39.673 58.6404 42.0755 59.3726 44.6267C60.1544 47.3512 60.283 50.1005 59.3132 52.8251C59.1698 53.2214 58.9966 53.6127 58.7937 53.9793C58.1456 55.1335 56.9136 55.1533 56.2209 54.0288C55.3847 52.6765 54.5782 51.3043 53.7223 49.9668C53.3462 49.3823 52.9207 48.8175 52.4507 48.3073C51.7679 47.5692 50.8921 47.3463 49.9521 47.7079C48.3193 48.3321 46.9092 49.2287 46.4243 51.0715C46.2511 51.7353 46.3402 52.3545 46.7063 52.9588C47.6563 54.5143 48.5766 56.0896 49.5018 57.6599C50.2291 58.8983 49.6206 59.9584 48.1758 59.9882C48.156 59.9882 48.1313 59.9882 48.1115 59.9882C44.9103 60.0327 44.8905 60.0526 42.3622 58.0661C40.8135 56.8475 39.3144 55.5645 37.8102 54.2914C37.4392 53.9793 37.1274 53.5929 36.8108 53.2263C36.41 52.7607 36.2715 52.2306 36.2715 51.5916C36.2665 49.407 36.1874 47.2225 36.1082 45.0379C36.1033 44.8298 35.9746 44.5871 35.8262 44.4385C34.3221 42.883 32.7883 41.3572 31.106 39.668ZM9.38532 44.3592C11.5821 46.5636 13.7789 48.768 15.9312 50.9278C28.0433 38.8012 40.1852 26.6398 52.2627 14.5478C50.1005 12.383 47.8938 10.1687 45.7118 7.97915C33.6244 20.086 21.4925 32.2375 9.38532 44.3592ZM9.97905 2.88176C10.3452 3.11458 10.548 3.22853 10.7361 3.36228C11.5376 3.91215 12.3837 4.41743 13.1308 5.03664C14.8279 6.43854 15.6789 8.21691 15.1247 10.4411C14.6448 12.3731 13.5761 13.9583 12.0076 15.1918C10.4689 16.4005 7.6536 17.1336 5.42216 15.5534C4.76905 15.0877 4.04668 14.7211 3.35399 14.31C3.2303 14.2357 3.08681 14.1861 2.95817 14.1267C2.91364 14.1812 2.86416 14.2307 2.81963 14.2852C4.59588 16.4153 6.36224 18.5504 8.15827 20.6606C8.30176 20.834 8.63326 20.9133 8.88064 20.9232C11.211 21.0223 13.5414 21.0669 15.8669 21.1956C16.2875 21.2204 16.7723 21.4532 17.084 21.7405C18.2319 22.8105 19.3204 23.94 20.4287 25.0546C21.1115 25.7431 21.7844 26.4416 22.4821 27.15C23.0659 26.5358 23.5904 25.9859 24.1693 25.3766C23.5904 24.8168 22.9669 24.2174 22.3534 23.6081C21.2105 22.4737 20.0577 21.3443 18.9395 20.1801C18.1231 19.3281 18.5041 18.0352 19.6173 17.8024C20.1962 17.6835 20.6365 17.946 21.0324 18.3423C22.7344 20.0563 24.4364 21.7703 26.0989 23.4397C26.7173 22.8551 27.2962 22.3003 27.9048 21.7257C27.7514 21.5622 27.6178 21.4037 27.4694 21.26C25.8366 19.6253 24.1841 18.0055 22.581 16.341C22.2644 16.0141 22.017 15.5286 21.9428 15.0828C21.5865 12.8635 21.2253 10.6393 21.0225 8.40516C20.8889 6.95868 20.1665 6.02737 19.0434 5.26945C17.658 4.3332 16.139 3.70409 14.5359 3.26816C13.111 2.86691 11.6563 2.67866 9.97905 2.88176ZM57.1412 50.0213C57.344 48.2726 57.1115 46.6924 56.6365 45.1468C56.0477 43.2297 55.2858 41.3969 53.8509 39.9256C53.4106 39.4699 52.9009 39.2073 52.2478 39.1231C49.7888 38.8111 47.3347 38.4692 44.8905 38.0878C44.4848 38.0234 44.0444 37.7856 43.7377 37.5033C42.8322 36.671 41.9812 35.7794 41.1154 34.9075C40.2841 34.0654 39.4628 33.2183 38.6811 32.4207C38.0329 33.04 37.454 33.5849 36.8504 34.1545C37.0038 34.3131 37.1423 34.4667 37.2907 34.6153C38.6514 35.9825 40.0169 37.3447 41.3825 38.712C42.4018 39.7324 42.565 40.5449 41.8823 41.2087C41.2193 41.8576 40.4227 41.6941 39.4331 40.7083C38.1467 39.4204 36.8504 38.1324 35.5738 36.8296C35.3413 36.5918 35.1731 36.2896 35.0246 36.0865C34.332 36.7652 33.7877 37.2952 33.2336 37.8352C33.3127 37.9243 33.4067 38.0383 33.5106 38.1423C35.0692 39.7027 36.6228 41.2681 38.1912 42.8186C38.6217 43.2446 38.8542 43.7103 38.8691 44.3295C38.9235 46.5339 39.0422 48.7383 39.0719 50.9427C39.0818 51.4876 39.2303 51.869 39.6409 52.196C41.6398 53.8059 43.6288 55.4209 45.6228 57.0308C45.6871 57.0853 45.786 57.0952 45.9741 57.1645C45.3803 56.1639 44.8757 55.2574 44.3166 54.3855C43.5051 53.1223 43.3913 51.76 43.7327 50.3532C44.3017 48.0002 45.9295 46.5438 47.9878 45.4986C50.7041 44.1165 53.2324 44.6713 55.0977 47.0838C55.8053 47.9903 56.4089 48.9612 57.1412 50.0213ZM7.2083 46.4199C6.70858 46.9252 6.18411 47.4206 5.70418 47.9556C4.5563 49.2386 4.54145 51.1458 5.69428 52.4189C6.39192 53.1867 7.12914 53.9248 7.89109 54.6233C9.03897 55.6784 10.8795 55.7825 12.1115 54.8314C12.7745 54.3211 13.3336 53.687 13.9125 53.1372C11.6613 50.8783 9.46449 48.6788 7.2083 46.4199ZM55.4292 4.97224C53.0642 5.54687 50.8427 6.08186 48.6953 6.602C50.3974 8.30608 52.0648 9.98043 53.7223 11.6449C54.2665 9.50487 54.8306 7.30049 55.4292 4.97224Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.0304 45.8509C15.5851 45.5041 15.1546 45.2763 14.8726 44.9245C14.546 44.5183 14.5955 43.9982 14.8874 43.5524C15.026 43.3394 15.2041 43.156 15.3822 42.9777C24.7186 33.6251 34.06 24.2775 43.4014 14.9249C43.5647 14.7614 43.7329 14.588 43.9209 14.4592C44.48 14.0778 45.2024 14.157 45.6675 14.6227C46.1425 15.0982 46.2167 15.8017 45.8357 16.3713C45.717 16.5447 45.5636 16.6983 45.4152 16.8469C36.049 26.2292 26.678 35.6116 17.3019 44.979C16.9754 45.306 16.5301 45.514 16.0304 45.8509Z"
                        fill="white"
                      />
                    </svg>
                  </FeatureIcon>

                  <Heading type={3}>3. Customize Your Chatbot</Heading>

                  <div className={'font-Outfit font-light text-gray_text-0 '}>
                    Customize the look and feel of your chatbot including colors
                    and your company logo
                  </div>
                </div>

                <div className={'group flex flex-col space-y-3 text-center'}>
                  <FeatureIcon>
                    <svg
                      width="60"
                      height="48"
                      viewBox="0 0 60 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M41.5987 42.2499C41.5987 43.5223 41.5987 44.7095 41.5987 45.9686C43.0409 45.9686 44.453 45.9667 45.8652 45.9705C46.118 45.9705 46.3783 45.9686 46.6199 46.0291C47.1406 46.1596 47.4178 46.5358 47.3766 47.0632C47.3354 47.585 47.0189 47.9197 46.4813 47.9858C46.2941 48.0085 46.1012 47.9972 45.9101 47.9972C35.3676 47.9972 24.827 47.9972 14.2864 47.9972C14.1179 47.9972 13.9475 48.0047 13.7789 47.9915C13.217 47.9423 12.8818 47.6342 12.8275 47.0632C12.775 46.5112 13.1215 46.0669 13.7002 46.0008C14.161 45.9478 14.6292 45.9724 15.0955 45.9705C16.1912 45.9667 17.2887 45.9686 18.4236 45.9686C18.4236 44.7265 18.4236 43.5393 18.4236 42.2499C18.182 42.2499 17.9367 42.2499 17.6932 42.2499C13.2489 42.2499 8.80076 42.1781 4.35827 42.2764C1.65383 42.3369 -0.0130334 40.3216 7.67705e-05 37.9092C0.0637549 26.4147 0.0562652 14.9183 0.00195148 3.42379C-0.00741294 1.34419 1.38788 -0.00565383 3.36377 1.78038e-05C21.1449 0.0397192 38.9261 0.0227053 56.7054 0.0245958C58.4472 0.0245958 59.5878 0.833746 59.9249 2.31971C59.9905 2.60708 59.9961 2.91335 59.9961 3.21017C59.9998 14.8559 60.0017 26.4998 59.998 38.1455C59.998 40.6165 58.3966 42.2424 55.9469 42.248C51.4389 42.2594 46.929 42.2518 42.4209 42.2518C42.17 42.2499 41.919 42.2499 41.5987 42.2499ZM54.1452 5.95146C38.0215 5.95146 21.9671 5.95146 5.90903 5.95146C5.90903 15.4685 5.90903 24.9401 5.90903 34.4231C22.0121 34.4231 38.0665 34.4231 54.1452 34.4231C54.1452 24.9174 54.1452 15.4571 54.1452 5.95146ZM3.83199 34.4249C3.83199 34.0998 3.83199 33.8483 3.83199 33.5969C3.83199 24.2368 3.83199 14.8767 3.83199 5.51663C3.83199 4.11384 4.07547 3.8624 5.43893 3.8624C21.8248 3.8624 38.2107 3.8624 54.5947 3.8624C55.9563 3.8624 56.1997 4.11384 56.1997 5.51852C56.1997 14.8994 56.1997 24.2803 56.1997 33.6631C56.1997 33.9107 56.1997 34.1565 56.1997 34.4325C56.8272 34.4325 57.3684 34.4325 57.9771 34.4325C57.9771 34.1886 57.9771 33.9807 57.9771 33.7727C57.9771 23.6432 57.9771 13.5136 57.9771 3.38598C57.9771 2.3027 57.7505 2.07395 56.6792 2.07395C38.8962 2.07395 21.1131 2.07395 3.33006 2.07395C2.29997 2.07395 2.06025 2.31404 2.06025 3.34817C2.06025 13.4777 2.06025 23.6072 2.06025 33.7349C2.06025 33.9599 2.06025 34.1867 2.06025 34.4231C2.68018 34.4249 3.20645 34.4249 3.83199 34.4249ZM2.08085 36.5405C2.08085 37.274 2.02467 37.9792 2.09584 38.6711C2.16701 39.3536 2.59028 39.8603 3.24579 40.0739C3.59789 40.1892 3.99307 40.2043 4.36952 40.2043C21.469 40.21 38.5684 40.21 55.6678 40.2081C55.9001 40.2081 56.1342 40.21 56.3646 40.1836C57.168 40.0928 57.8629 39.467 57.9397 38.6635C58.0052 37.9716 57.9528 37.2683 57.9528 36.5386C39.3082 36.5405 20.7161 36.5405 2.08085 36.5405ZM20.6973 45.9214C26.9472 45.9214 33.1333 45.9214 39.3382 45.9214C39.3382 44.6906 39.3382 43.5071 39.3382 42.2877C33.1108 42.2877 26.9247 42.2877 20.6973 42.2877C20.6973 43.509 20.6973 44.6925 20.6973 45.9214Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.3862 18.5385C19.2516 20.0453 21.0645 21.5105 22.8794 22.9756C23.6229 23.5768 24.3739 24.1667 25.1118 24.7754C25.7112 25.2727 25.816 25.836 25.4284 26.3276C25.0444 26.8153 24.4601 26.8361 23.8626 26.3559C20.999 24.0514 18.1391 21.7449 15.2829 19.4328C14.5712 18.8561 14.5731 18.2134 15.2998 17.6235C18.1522 15.3076 21.014 13.0011 23.8757 10.6947C24.4545 10.2277 25.0725 10.2617 25.4433 10.7495C25.8179 11.2448 25.7018 11.8139 25.1006 12.2997C22.8063 14.1581 20.5045 16.009 18.2084 17.8617C17.9443 18.0735 17.6877 18.2909 17.3862 18.5385Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M42.6404 18.5208C41.9212 17.9366 41.2339 17.3789 40.5446 16.8212C38.6624 15.2993 36.7745 13.7793 34.896 12.2517C34.2911 11.7602 34.2124 11.125 34.6731 10.6523C35.0402 10.2742 35.5815 10.2326 36.0553 10.6145C38.9864 12.9683 41.9137 15.3277 44.8279 17.7041C45.4703 18.2277 45.4291 18.8819 44.7511 19.4301C41.8969 21.7461 39.037 24.0506 36.1733 26.3552C35.574 26.8373 34.9934 26.8146 34.6076 26.3268C34.218 25.8353 34.3248 25.2644 34.926 24.7785C37.3345 22.8256 39.7487 20.8783 42.1609 18.9291C42.3051 18.8119 42.4456 18.6872 42.6404 18.5208Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M33.8452 10.1226C33.8096 10.253 33.7609 10.4818 33.6879 10.7011C31.8599 16.127 30.0282 21.5509 28.1947 26.9768C28.1404 27.1375 28.0861 27.302 28.0093 27.4513C27.7527 27.9542 27.2096 28.1811 26.7264 27.9504C26.2282 27.7122 25.9922 27.2963 26.1664 26.7424C26.4997 25.6874 26.8593 24.6401 27.2133 23.5908C28.7322 19.0932 30.2511 14.5975 31.7738 10.1018C31.8487 9.8806 31.9142 9.64616 32.0397 9.45711C32.3019 9.06198 32.6915 8.90885 33.1466 9.05821C33.5923 9.20756 33.8396 9.53273 33.8452 10.1226Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.1048 33.1377C11.5409 33.1377 9.97893 33.1415 8.41507 33.1358C7.65094 33.1339 7.19957 32.7577 7.19582 32.1433C7.19208 31.5345 7.64345 31.1281 8.40384 31.1243C11.5522 31.1148 14.6986 31.1148 17.8469 31.1243C18.6017 31.1262 19.0643 31.5326 19.068 32.1319C19.0718 32.7615 18.6054 33.1339 17.7945 33.1358C16.2325 33.1415 14.6686 33.1377 13.1048 33.1377Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M47.0697 33.1372C45.5039 33.1372 43.9363 33.141 42.3706 33.1353C41.5934 33.1334 41.157 32.7742 41.1476 32.1522C41.1382 31.5226 41.5653 31.1256 42.3388 31.1237C45.4927 31.1124 48.6485 31.1124 51.8024 31.1237C52.5535 31.1256 53.0123 31.5472 53.003 32.1522C52.9917 32.7647 52.5422 33.1315 51.7725 33.1353C50.203 33.141 48.6354 33.1372 47.0697 33.1372Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.848 29.6425C10.728 29.6425 9.60802 29.6463 8.4899 29.6425C7.68456 29.6388 7.21259 29.2663 7.19948 28.6424C7.18637 28.0129 7.66396 27.6102 8.45432 27.6083C10.7355 27.6045 13.0167 27.6045 15.2997 27.6083C16.1051 27.6102 16.5602 27.994 16.5508 28.6387C16.5414 29.2777 16.0882 29.6388 15.2716 29.6425C14.131 29.6463 12.9886 29.6425 11.848 29.6425Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M48.347 27.6106C49.4876 27.6106 50.6282 27.6068 51.7688 27.6125C52.5273 27.6163 52.9843 27.9925 52.9974 28.605C53.0105 29.2403 52.5385 29.6392 51.7463 29.6411C49.4651 29.6448 47.1821 29.6448 44.9009 29.6411C44.1124 29.6392 43.6274 29.2384 43.6349 28.6145C43.6423 27.9925 44.1218 27.6144 44.9215 27.6125C46.0659 27.6068 47.2064 27.6106 48.347 27.6106Z"
                        fill="white"
                      />
                    </svg>
                  </FeatureIcon>

                  <Heading type={3}>4. Embed Chatbot On Website</Heading>

                  <div className={'font-Outfit font-light text-gray_text-0 '}>
                    Embed the chatbot on your website using {'<script>'} tag or
                    iframe
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant={'normal'}
              size={'normal'}
              className={
                'group h-[60px] rounded-lg border border-btncolor-0 transition delay-75 ease-linear	hover:bg-btncolor-0	hover:shadow-btn-shadow'
              }
              type="button"
              onClick={() => router.push(configuration.paths.signUp)}
            >
              <span
                className={
                  'text-bg-btncolor-0 flex items-center space-x-2	font-Outfit text-lg font-medium group-hover:text-black-700'
                }
              >
                <span>Build Your Chatbot</span>
                <ArrowSmallRightIcon
                  className={'hidden h-6	group-hover:block'}
                />
              </span>
            </Button>
          </div>
        </Container>
        <BlendUpperWithBottom />
      </div>

      <div className="feature-background pb-5" id="features" data-section>
        <BlendUpperWithTop />
        <Container>
          <div
            className={
              'relative z-10 flex flex-col items-center justify-center space-y-0 py-10'
            }
          >
            <div
              className={
                'flex max-w-3xl flex-col items-center space-y-4 text-center'
              }
            >
              <h1
                className={
                  'flex flex-row text-center font-Outfit text-7xl font-bold text-white 1xs:block 1xs:text-4xl sm:block sm:text-4xl lg:text-left xl:text-7xl 2xl:text-7xl	'
                }
              >
                <span>Tawk</span>
                <span
                  className={
                    'bg-gradient-to-br bg-clip-text text-transparent' +
                    ' from-logocolor-100 to-logocolor-200' +
                    ' to-logocolor-200'
                  }
                >
                  with
                </span>
                <span>.ai Features</span>
              </h1>
            </div>
            <div>
              <div
                className={
                  'grid gap-6 px-5 py-7 sm:px-0 md:grid-cols-2 lg:grid-cols-3 '
                }
              >
                <div
                  className={
                    'transtion group flex flex-col space-y-3 rounded-2xl bg-transparent py-12 text-center duration-300 hover:border hover:bg-gradient-to-br hover:shadow-3xl' +
                    ' border border-gray_text-0 border-opacity-20 from-tulip-0 to-tulip-1 p-7 hover:border-transparent'
                  }
                >
                  <FeatureIcon1>
                    <svg
                      width="90"
                      height="90"
                      viewBox="0 0 90 90"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_589_5879)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M27.3624 64.6322C27.3624 65.2813 27.3728 65.8373 27.3589 66.3897C27.3416 67.0872 27.0407 67.4118 26.335 67.4187C24.4429 67.436 22.5542 67.4222 20.662 67.4256C20.022 67.4256 19.7003 67.1149 19.5723 66.4933C18.8563 63.0196 18.1195 59.5494 17.3965 56.0757C16.6078 52.2982 15.8261 48.5206 15.0478 44.7431C14.8644 43.8591 15.2069 43.4241 16.1097 43.4206C19.4893 43.4102 22.8724 43.4137 26.252 43.4206C27.0269 43.4206 27.3451 43.7521 27.3624 44.5152C27.3728 44.9779 27.3624 45.4406 27.3624 45.9413C28.4313 45.9413 29.4483 45.9205 30.4618 45.9447C34.2288 46.031 37.9717 46.3038 41.5727 47.5227C43.3368 48.1201 44.9661 48.9557 46.2633 50.3438C46.4155 50.5061 46.7268 50.5855 46.962 50.5855C49.1863 50.6028 51.414 50.6546 53.6348 50.5786C55.7622 50.5061 57.4502 51.0896 58.3531 53.2098C60.5842 52.3465 62.7739 51.5005 64.9635 50.6511C66.3507 50.1125 67.7343 49.5669 69.1249 49.0386C71.3561 48.1891 73.6391 49.0558 74.5904 51.1035C75.5521 53.1718 74.7841 55.4542 72.6671 56.604C64.4931 61.048 56.3191 65.492 48.1209 69.8945C45.4227 71.3413 42.6277 71.3275 39.8327 70.0948C35.8927 68.3545 31.9527 66.6176 28.0127 64.8808C27.8363 64.8048 27.6495 64.7427 27.3624 64.6322ZM27.4039 47.792C27.3866 47.9889 27.3659 48.1166 27.3659 48.2444C27.3659 52.8852 27.3728 57.5225 27.352 62.1633C27.3486 62.6087 27.5838 62.7158 27.902 62.8539C32.1084 64.7012 36.3147 66.552 40.5142 68.4132C42.9356 69.4836 45.2947 69.3938 47.6193 68.1266C50.1341 66.7523 52.6558 65.3953 55.1706 64.0314C60.7122 61.0238 66.2573 58.0232 71.7954 55.0088C73.0545 54.3216 73.5146 53.0268 72.9577 51.8597C72.4077 50.7133 71.1347 50.2368 69.8375 50.7374C66.1915 52.1393 62.5525 53.5551 58.9169 54.9846C58.7267 55.0606 58.5157 55.2574 58.4465 55.4473C57.7131 57.4604 56.4851 58.3409 54.3266 58.3478C51.6596 58.3547 48.9891 58.3512 46.3221 58.3478C46.1215 58.3478 45.9174 58.3581 45.7237 58.3201C45.2428 58.2304 44.9799 57.9231 44.9869 57.4396C44.9903 56.9562 45.2567 56.6489 45.741 56.5764C45.9589 56.5419 46.1837 56.5522 46.4051 56.5522C49.0306 56.5522 51.6527 56.5591 54.2782 56.5453C54.6725 56.5419 55.0876 56.5039 55.4543 56.3727C56.3571 56.0446 56.8864 55.0398 56.7065 54.1144C56.5197 53.1511 55.693 52.457 54.6552 52.4536C51.8983 52.4397 49.1413 52.4639 46.3809 52.4259C46.0038 52.4225 45.4919 52.2671 45.2774 51.9978C44.2328 50.696 42.856 49.9329 41.3271 49.3873C38.0858 48.2306 34.7027 47.9233 31.2955 47.8059C30.0087 47.7541 28.7218 47.792 27.4039 47.792ZM17.0056 45.2817C18.4239 52.0668 19.8387 58.8208 21.25 65.5714C22.6994 65.5714 24.0866 65.5714 25.4944 65.5714C25.4944 58.7898 25.4944 52.053 25.4944 45.2817C22.6683 45.2817 19.8768 45.2817 17.0056 45.2817Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M61.0268 27.0632C61.0199 35.9304 53.8179 43.1161 44.9417 43.1161C36.0896 43.1161 28.8462 35.8821 28.8496 27.0459C28.8531 18.2063 36.0896 10.9965 44.9555 11C53.8386 11.0069 61.0372 18.1994 61.0268 27.0632ZM44.9555 41.2998C52.8251 41.2963 59.2246 34.9256 59.2315 27.0805C59.2418 19.2388 52.8562 12.8542 44.9832 12.8335C37.0859 12.8094 30.683 19.1939 30.6899 27.0839C30.7003 34.9394 37.0859 41.3032 44.9555 41.2998Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.5063 27.0641C32.5029 20.2238 38.0721 14.6369 44.9109 14.6231C51.7912 14.6093 57.3951 20.1858 57.3985 27.0468C57.402 33.9113 51.7878 39.5121 44.9282 39.4948C38.0825 39.481 32.5098 33.901 32.5063 27.0641ZM55.5582 27.0917C55.5686 21.232 50.8538 16.4808 45.0112 16.4635C39.1272 16.4462 34.3362 21.1837 34.3224 27.04C34.3086 32.8651 39.0649 37.6509 44.8902 37.6682C50.7881 37.6889 55.5479 32.9687 55.5582 27.0917Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M45.8691 22.5878C45.8691 22.7881 45.8864 22.9884 45.8657 23.1852C45.7827 23.9483 45.8311 24.6251 46.6959 24.9635C46.8827 25.036 47.0695 25.2501 47.1421 25.44C47.4119 26.1755 47.9654 26.2307 48.6261 26.1789C49.1554 26.1375 49.6915 26.1617 50.2277 26.1755C50.7777 26.1893 51.0994 26.4793 51.134 27.0352C51.1651 27.5636 50.8088 27.9296 50.2208 27.9503C49.5082 27.9744 48.7956 27.971 48.0865 27.9537C47.7475 27.9468 47.5399 28.0228 47.3531 28.3577C46.7374 29.4661 45.6028 29.9841 44.4405 29.77C43.3197 29.5628 42.4273 28.6374 42.2266 27.4703C42.0364 26.3723 42.6072 25.288 43.6726 24.6216C43.8525 24.5111 44.0254 24.2349 44.0323 24.0312C44.0704 23.0333 44.0427 22.0319 44.0531 21.034C44.06 20.3745 44.4336 19.9463 44.9663 19.9532C45.4852 19.9601 45.8311 20.3538 45.8726 20.9891C45.8761 21.034 45.8761 21.0789 45.8761 21.1238C45.8691 21.6106 45.8691 22.101 45.8691 22.5878ZM45.8934 27.0594C45.8899 26.5622 45.4575 26.1444 44.9455 26.1478C44.4232 26.1513 44.0289 26.5484 44.0323 27.0732C44.0358 27.5946 44.4405 27.9952 44.9594 27.9883C45.4644 27.9848 45.8968 27.5566 45.8934 27.0594Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M39.6354 33.2444C39.6458 33.7175 39.2411 34.1491 38.7707 34.1698C38.2968 34.1905 37.8678 33.7969 37.8401 33.3135C37.8125 32.8093 38.2379 32.3535 38.7361 32.3535C39.2031 32.3501 39.6251 32.7714 39.6354 33.2444Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M44.928 19.1941C44.4368 19.1838 44.0459 18.7832 44.0493 18.2929C44.0528 17.7819 44.4921 17.371 45.0041 17.402C45.4918 17.4297 45.8723 17.8475 45.8516 18.3344C45.8308 18.8247 45.4226 19.2045 44.928 19.1941Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M52.054 20.9205C52.0264 21.397 51.594 21.7941 51.127 21.7769C50.6185 21.7561 50.2276 21.3038 50.2726 20.7893C50.3141 20.3024 50.7499 19.9295 51.2238 19.9675C51.7047 20.0089 52.0817 20.4406 52.054 20.9205Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M51.1442 34.1656C50.6634 34.1552 50.269 33.7478 50.269 33.2574C50.269 32.7706 50.6668 32.3562 51.1442 32.3459C51.6389 32.3355 52.0747 32.7844 52.0574 33.2885C52.0401 33.7685 51.6147 34.1759 51.1442 34.1656Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M38.7496 21.7771C38.2723 21.7806 37.8676 21.38 37.8537 20.8932C37.8433 20.4028 38.2204 19.9885 38.7047 19.9678C39.2028 19.9436 39.6456 20.3787 39.6387 20.8828C39.6352 21.3628 39.227 21.7737 38.7496 21.7771Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M53.7037 26.1799C54.2122 26.1695 54.5962 26.5287 54.6135 27.0293C54.6343 27.5611 54.2434 27.9616 53.7107 27.9547C53.2091 27.9478 52.8355 27.5715 52.832 27.0708C52.832 26.5666 53.1987 26.1903 53.7037 26.1799Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M45.855 35.8241C45.855 36.311 45.4606 36.715 44.9729 36.7253C44.4609 36.7357 44.0355 36.3075 44.0528 35.7965C44.0701 35.3062 44.4713 34.9229 44.966 34.9298C45.4572 34.9367 45.8515 35.3338 45.855 35.8241Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M37.0792 27.0951C37.0619 27.5785 36.6502 27.9583 36.1556 27.9514C35.6367 27.9445 35.2216 27.506 35.2631 27.0019C35.3012 26.515 35.7163 26.1559 36.2144 26.1766C36.7021 26.2008 37.0965 26.6221 37.0792 27.0951Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_589_5879"
                          x="0"
                          y="0"
                          width="90"
                          height="90"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="7.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_589_5879"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_589_5879"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </FeatureIcon1>

                  <Heading type={4}>Instant Chatbot</Heading>

                  <div
                    className={
                      'font-Outfit font-light text-gray_text-0 group-hover:text-white '
                    }
                  >
                    Create customized chatbots in minutes with your Pdf or
                    website URL
                  </div>
                </div>
                <div
                  className={
                    'transtion group flex flex-col space-y-3 rounded-2xl bg-transparent py-12 text-center duration-300 hover:border hover:bg-gradient-to-br hover:shadow-3xl' +
                    ' border border-gray_text-0 border-opacity-20 from-tulip-0 to-tulip-1 p-7 hover:border-transparent'
                  }
                >
                  <FeatureIcon1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="93"
                      viewBox="0 0 90 93"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_849_713)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M22.8268 51.8534C21.5702 51.6427 20.3784 51.5929 19.2856 51.2328C16.7611 50.4015 15.0858 48.0072 15.0248 45.3525C14.9944 43.9236 14.9906 42.4947 15.021 41.0658C15.0896 37.5069 17.8501 34.7295 21.3836 34.6376C21.8215 34.6261 22.2594 34.6376 22.7544 34.6376C22.8153 33.7259 22.8191 32.8448 22.941 31.9828C23.5845 27.5122 27.2817 24.2139 31.7862 24.1449C35.4339 24.0913 39.0817 24.1296 42.7333 24.1258C43.0226 24.1258 43.312 24.1258 43.689 24.1258C43.689 22.785 43.708 21.5132 43.6661 20.2413C43.6623 20.0689 43.3577 19.8582 43.1445 19.7548C41.3054 18.8775 40.2659 17.0847 40.4601 15.0888C40.6467 13.2041 42.0517 11.5951 43.9175 11.1354C46.1906 10.5723 48.4828 11.8096 49.2825 14.0315C50.0783 16.2457 49.1111 18.7013 46.9674 19.6782C46.4038 19.9348 46.2858 20.2298 46.301 20.7776C46.3353 21.8579 46.3125 22.9421 46.3125 24.1296C46.6209 24.1296 46.8798 24.1296 47.1387 24.1296C50.6418 24.1296 54.1449 24.2139 57.6441 24.1105C63.0205 23.9534 67.3956 28.3512 67.1823 33.7642C67.1709 34.0285 67.1823 34.2928 67.1823 34.5533C68.1304 34.6338 69.0176 34.6223 69.8667 34.7985C72.8253 35.4153 74.9309 37.9666 74.9766 41.0045C75.0033 42.7973 75.049 44.6131 74.8357 46.383C74.5959 48.3444 73.4193 49.8154 71.7058 50.7884C71.2299 51.0566 71.089 51.3516 71.089 51.884C71.089 54.8376 71.1766 57.8027 70.9938 60.7486C70.6473 66.3263 65.7126 71.1034 60.161 71.3141C57.4728 71.4175 54.7731 71.3562 52.0811 71.3447C51.5709 71.3409 51.2662 71.4367 50.9921 71.95C50.2915 73.2601 49.1492 73.9612 47.649 73.9842C46.3277 74.0033 45.0026 74.0072 43.6814 73.9842C41.4691 73.9497 39.7633 72.1952 39.7899 70.0193C39.8166 67.8548 41.5072 66.1616 43.689 66.1386C44.9874 66.1233 46.2858 66.131 47.5804 66.1386C49.1454 66.1463 50.2648 66.8895 51.0606 68.2226C51.1977 68.4524 51.4947 68.7359 51.7232 68.7397C54.5371 68.7551 57.3623 68.8623 60.1648 68.6708C64.7111 68.3605 68.2713 64.6101 68.4617 60.0208C68.5721 57.3392 68.4883 54.6499 68.4845 51.9645C68.4845 51.8955 68.4503 51.8266 68.4236 51.7193C68.0429 51.7193 67.6621 51.7193 67.247 51.7193C67.1861 52.5966 67.1823 53.4815 67.0605 54.3473C66.436 58.7604 62.6855 62.143 58.2686 62.1622C49.4272 62.2043 40.5895 62.2082 31.7481 62.1622C26.8591 62.1392 22.8801 58.044 22.8191 53.1176C22.8191 52.6655 22.8268 52.225 22.8268 51.8534ZM44.9798 59.5572C49.2177 59.5572 53.4519 59.5726 57.6898 59.5534C61.863 59.5304 64.5626 56.7799 64.5626 52.5813C64.5665 46.2987 64.5664 40.0161 64.5588 33.7335C64.5588 33.2432 64.5627 32.7413 64.4789 32.2625C63.8963 28.9028 61.2538 26.7499 57.7012 26.7461C49.252 26.7384 40.8066 26.7384 32.3573 26.7461C28.1956 26.7499 25.4502 29.5081 25.4464 33.6837C25.4426 39.9893 25.4426 46.2987 25.4502 52.6042C25.4502 53.0946 25.4502 53.5964 25.5378 54.0753C26.1394 57.4234 28.7591 59.5381 32.3459 59.5534C36.5572 59.5687 40.7685 59.5572 44.9798 59.5572ZM22.7849 37.3269C19.7692 36.7829 17.6255 38.5566 17.6102 41.5714C17.6064 42.6556 17.6026 43.7358 17.6102 44.82C17.6369 47.7697 19.8568 49.5472 22.7849 48.9458C22.7849 45.0728 22.7849 41.196 22.7849 37.3269ZM67.228 37.3039C67.228 41.2152 67.228 45.0958 67.228 48.9688C70.5521 49.5396 72.5626 47.333 72.4102 44.6476C72.3531 43.6401 72.4179 42.6287 72.395 41.6212C72.3836 41.1079 72.3646 40.5792 72.2275 40.0889C71.6411 38.0049 69.821 36.9897 67.228 37.3039ZM45.6842 71.3524C46.3201 71.3524 46.9522 71.3715 47.588 71.3485C48.3686 71.3217 48.9131 70.7816 48.9207 70.069C48.9283 69.3603 48.3876 68.7896 47.6109 68.7704C46.3163 68.7436 45.0255 68.7436 43.7309 68.7704C42.9465 68.7857 42.402 69.3412 42.3982 70.0499C42.3906 70.7816 42.9617 71.3294 43.7842 71.3524C44.4124 71.3677 45.0483 71.3524 45.6842 71.3524ZM45.0103 17.5329C46.1069 17.5291 46.9484 16.671 46.9407 15.5638C46.9293 14.4874 46.1069 13.6561 45.0369 13.6408C43.9289 13.6254 43.0759 14.4644 43.0721 15.5715C43.0645 16.6786 43.9136 17.5329 45.0103 17.5329Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M48.9359 38.5909C48.9207 36.3882 50.6379 34.6375 52.8197 34.6337C54.9977 34.6298 56.753 36.3844 56.753 38.5565C56.753 40.6902 55.0091 42.4639 52.8883 42.4907C50.7179 42.5175 48.9511 40.7745 48.9359 38.5909ZM52.8311 37.2616C52.1115 37.2616 51.5213 37.8631 51.5365 38.5794C51.5517 39.2767 52.1077 39.8321 52.8045 39.8475C53.5394 39.8628 54.1181 39.3035 54.1258 38.5718C54.1296 37.8363 53.5622 37.2616 52.8311 37.2616Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M41.0732 38.5373C41.0808 40.7247 39.3369 42.4945 37.1741 42.4907C35.019 42.4907 33.2484 40.7017 33.2598 38.5373C33.2674 36.392 34.9999 34.649 37.1361 34.6336C39.3293 34.6183 41.0656 36.3384 41.0732 38.5373ZM38.4763 38.5641C38.4801 37.8439 37.89 37.2539 37.1665 37.2578C36.4621 37.2616 35.91 37.8056 35.8909 38.5105C35.8681 39.2498 36.4202 39.8359 37.1513 39.8474C37.8785 39.8628 38.4725 39.2881 38.4763 38.5641Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M43.8413 52.9912C42.6 52.9874 40.3154 52.4434 38.145 51.3899C37.2806 50.9724 36.9722 50.2828 37.3149 49.5511C37.6538 48.8271 38.3811 48.6126 39.2606 49.0225C42.7408 50.6582 46.2744 50.7923 49.865 49.4132C50.2305 49.2715 50.577 49.0838 50.9388 48.942C51.6927 48.6432 52.3743 48.8807 52.6903 49.532C53.0178 50.2177 52.755 50.9149 52.0201 51.321C50.2191 52.317 47.3976 52.9874 43.8413 52.9912Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_849_713"
                          x="0"
                          y="0"
                          width="90"
                          height="93"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="7.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_849_713"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_849_713"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </FeatureIcon1>

                  <Heading type={4}>Automate your Customer Service</Heading>

                  <div
                    className={
                      'font-Outfit font-light text-gray_text-0 group-hover:text-white '
                    }
                  >
                    Let our chatbot handle your customer service chats, while
                    your team focuses on more important tasks.
                  </div>
                </div>
                <div
                  className={
                    'transtion group flex flex-col space-y-3 rounded-2xl bg-transparent py-12 text-center duration-300 hover:border hover:bg-gradient-to-br hover:shadow-3xl' +
                    ' border border-gray_text-0 border-opacity-20 from-tulip-0 to-tulip-1 p-7 hover:border-transparent'
                  }
                >
                  <FeatureIcon1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="90"
                      viewBox="0 0 90 90"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_849_682)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M57.6898 60.7593C55.8891 61.5596 54.1901 62.3402 52.4682 63.065C51.8319 63.334 51.1464 63.4947 50.4707 63.6456C50.0804 63.7341 49.9656 63.9047 49.9754 64.2885C49.9984 65.384 49.9361 66.4827 49.9918 67.5782C50.1066 69.7758 48.424 70.9172 46.7808 70.9697C45.5803 71.009 44.3766 71.0123 43.1761 70.9664C41.5526 70.9073 39.8831 69.7626 39.9913 67.6143C40.0471 66.4991 40.0176 65.3774 39.9848 64.2622C39.9782 64.0687 39.8142 63.7407 39.6666 63.7046C37.1017 63.0913 34.7172 62.0647 32.4147 60.6281C31.598 61.448 30.7879 62.268 29.9745 63.0814C28.1476 64.9018 26.5109 64.9018 24.684 63.0749C23.9985 62.3894 23.3162 61.6973 22.6274 61.0151C21.4532 59.854 20.9941 57.7384 22.6635 56.2559C23.5917 55.4327 24.4314 54.5077 25.3367 53.6058C25.2579 53.4483 25.1989 53.2942 25.1136 53.1564C23.841 51.0737 22.903 48.8499 22.3487 46.4719C22.2568 46.0783 22.083 45.9734 21.7025 45.9799C20.607 45.9996 19.505 45.9373 18.4128 45.9963C16.1693 46.1177 15.0508 44.3367 15.018 42.7164C14.9951 41.5553 14.9918 40.3975 15.0213 39.2364C15.064 37.603 16.2054 35.8811 18.3832 35.9926C19.4984 36.0483 20.6201 36.0188 21.7353 35.986C21.9288 35.9795 22.2503 35.8122 22.2863 35.6646C22.8964 33.0997 23.9263 30.7152 25.3629 28.4192C24.497 27.5566 23.6344 26.6973 22.775 25.838C21.1482 24.2111 21.1515 22.4695 22.7849 20.8197C23.4835 20.1145 24.2018 19.4323 24.884 18.7107C26.032 17.4938 28.2099 16.9199 29.7842 18.7074C30.5911 19.6225 31.4931 20.4556 32.3754 21.351C33.1232 20.9443 33.8087 20.4818 34.5565 20.1768C36.1506 19.5307 37.7676 18.9239 39.4042 18.3893C39.893 18.2286 40.0241 18.0514 40.011 17.5758C39.9782 16.5 40.0438 15.4242 39.9913 14.3484C39.8897 12.2427 41.5559 11.0783 43.2089 11.0258C44.3897 10.9898 45.5705 10.993 46.7512 11.0258C48.4011 11.0718 50.1001 12.2165 49.9951 14.3878C49.9393 15.5029 49.9689 16.6247 50.0017 17.7398C50.0082 17.9333 50.1755 18.2548 50.3231 18.2909C52.8913 18.8944 55.2725 19.9308 57.5717 21.3642C58.4475 20.4819 59.3199 19.6061 60.1957 18.7304C61.7405 17.1855 63.4985 17.1691 65.0794 18.7008C65.8371 19.4355 66.5784 20.1834 67.3131 20.941C67.5328 21.1673 67.7362 21.4166 67.9002 21.6823C68.6316 22.8631 68.566 23.1747 67.4541 23.9651C66.4898 24.6474 65.5288 25.3296 64.4759 25.9298C64.9614 25.4444 65.4468 24.9589 65.929 24.4735C66.7161 23.6831 66.7391 23.05 65.9683 22.2497C65.2533 21.5052 64.5186 20.777 63.7773 20.0587C62.9344 19.242 62.3243 19.2519 61.5109 20.0686C60.2908 21.2887 59.0706 22.5121 57.8374 23.7486C57.6012 23.6109 57.3979 23.5026 57.2076 23.3747C54.6296 21.6167 51.8056 20.4491 48.7389 19.8882C48.2272 19.7931 48.1026 19.593 48.1091 19.1043C48.1387 17.5234 48.1223 15.9424 48.119 14.3582C48.1157 13.4464 47.6598 12.9413 46.7349 12.9151C45.577 12.8823 44.416 12.8823 43.2549 12.9151C42.3037 12.9413 41.8576 13.4431 41.8543 14.4042C41.8511 16.1524 41.8543 17.9006 41.8543 19.6127C40.1324 20.1506 38.4104 20.5638 36.7934 21.233C35.1895 21.8988 33.6906 22.8204 32.0703 23.6699C30.965 22.5646 29.7908 21.3904 28.6166 20.2162C27.59 19.1929 27.0717 19.1928 26.0353 20.226C25.3629 20.8951 24.684 21.561 24.0247 22.2432C23.2408 23.0533 23.2506 23.6765 24.0378 24.4637C25.2579 25.6871 26.4814 26.9072 27.7441 28.1667C27.5933 28.4094 27.4588 28.6423 27.3112 28.8653C25.5761 31.4335 24.4281 34.2411 23.8705 37.2849C23.782 37.7637 23.5885 37.8884 23.1227 37.8785C21.5418 37.8523 19.9609 37.8654 18.3767 37.8687C17.4288 37.872 16.9269 38.3312 16.9007 39.2856C16.8712 40.4238 16.8712 41.5652 16.9007 42.7033C16.9237 43.684 17.4255 44.1301 18.4292 44.1334C20.033 44.1366 21.6336 44.1399 23.2375 44.1301C23.5393 44.1301 23.7623 44.1596 23.8279 44.5237C24.4052 47.8364 25.704 50.8506 27.6129 53.609C27.6588 53.6746 27.672 53.7632 27.7245 53.8977C26.4748 55.1342 25.2153 56.3773 23.9624 57.6269C23.3064 58.2797 23.2605 58.9356 23.8935 59.6113C24.684 60.4575 25.5072 61.2775 26.3502 62.0745C27.0553 62.7403 27.7048 62.701 28.3837 62.0187C29.6334 60.7658 30.8765 59.5096 32.1064 58.2698C33.2839 58.9455 34.3761 59.6178 35.5143 60.2148C37.3182 61.1594 39.2534 61.7465 41.2508 62.1139C41.7756 62.209 41.8773 62.4287 41.8707 62.9043C41.8445 64.4852 41.8576 66.0662 41.8642 67.6504C41.8675 68.536 42.307 69.0509 43.1893 69.0837C44.3897 69.1263 45.5934 69.1263 46.7939 69.0837C47.6795 69.0542 48.1223 68.5392 48.1255 67.6569C48.1321 66.0334 48.1354 64.4098 48.1223 62.7863C48.119 62.4517 48.1649 62.2319 48.5552 62.1631C51.8679 61.5825 54.8723 60.2673 57.6373 58.3682C57.6865 58.3321 57.7554 58.3256 57.8702 58.2862C59.0739 59.4932 60.294 60.7133 61.5142 61.9367C62.3309 62.7534 62.9475 62.7666 63.7806 61.9564C64.5219 61.2381 65.2566 60.5067 65.9716 59.7622C66.7489 58.9553 66.7292 58.3288 65.9388 57.5384C64.7482 56.3445 63.5543 55.1506 62.3637 53.9534C62.3342 53.9239 62.321 53.8813 62.2718 53.7993C62.3899 53.609 62.5113 53.3926 62.6523 53.1859C64.3841 50.6177 65.5452 47.8134 66.1093 44.7729C66.2012 44.281 66.3783 44.1202 66.8801 44.1301C68.4611 44.1629 70.042 44.1432 71.6262 44.1399C72.5413 44.1366 73.0529 43.6873 73.0792 42.7689C73.1152 41.6111 73.112 40.45 73.0825 39.2889C73.0562 38.3344 72.5544 37.8818 71.6032 37.8785C70.0846 37.8753 68.566 37.8753 67.0474 37.872C67.008 37.872 66.9654 37.8523 66.7489 37.7998C68.0183 37.1373 68.7825 35.8319 70.3601 36.0123C70.8587 36.0713 71.3703 36.0123 71.8787 36.0254C73.6269 36.068 74.8831 37.3374 74.9618 39.2135C75.011 40.4139 75.0045 41.6177 74.9618 42.8181C74.9028 44.4482 73.7614 46.1177 71.6196 46.0127C70.5044 45.957 69.3827 46.0095 68.2675 45.9996C67.9723 45.9963 67.746 46.0193 67.664 46.3834C67.0999 48.8925 66.0897 51.2212 64.7383 53.4057C64.7055 53.4582 64.6957 53.5238 64.6629 53.6189C65.578 54.534 66.5062 55.4523 67.4279 56.3806C68.671 57.6335 68.7923 59.3686 67.6247 60.7002C66.7096 61.7432 65.7223 62.7371 64.6727 63.6489C63.3345 64.8132 61.6126 64.6788 60.3564 63.4291C59.4249 62.5042 58.5065 61.576 57.6898 60.7593Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M47.5286 40.3647C49.1325 39.2298 50.6806 38.1376 52.2288 37.0454C57.9752 32.9783 63.7183 28.9112 69.4615 24.8441C71.0457 23.7223 72.4068 23.9519 73.5286 25.5263C73.7975 25.9035 74.0698 26.2807 74.3354 26.6611C75.3588 28.1305 75.1226 29.5803 73.6696 30.6134C68.7891 34.077 63.902 37.5308 59.0182 40.9911C55.3709 43.5724 51.7269 46.1537 48.0797 48.7383C46.5184 49.8436 45.3967 49.6468 44.275 48.0954C42.248 45.2944 40.2177 42.4999 38.1841 39.7021C37.0854 38.1901 37.3018 36.76 38.8041 35.6547C39.2468 35.33 39.6798 34.9954 40.1324 34.6838C41.3755 33.8245 42.7924 34.0278 43.7108 35.2349C44.8588 36.7436 45.9707 38.2819 47.1022 39.8038C47.2269 39.9711 47.3548 40.1351 47.5286 40.3647ZM39.2862 37.9047C39.4666 38.1999 39.5912 38.4393 39.7487 38.6558C41.7396 41.4044 43.737 44.1497 45.728 46.8982C46.3052 47.6953 46.3019 47.6985 47.0826 47.1442C51.4875 44.025 55.8892 40.9058 60.2941 37.7866C64.3349 34.9233 68.3791 32.0632 72.4232 29.1998C73.2432 28.6192 73.2793 28.4061 72.6856 27.5664C72.456 27.2384 72.2231 26.9137 71.9903 26.589C71.5048 25.9133 71.2621 25.8707 70.593 26.343C65.5518 29.9115 60.5106 33.4768 55.4693 37.0454C53.2685 38.6033 51.0742 40.1744 48.8603 41.716C47.4106 42.7229 46.8366 42.6048 45.8231 41.2207C44.6653 39.6365 43.4976 38.0622 42.3267 36.4911C41.9167 35.9433 41.651 35.904 41.1098 36.2877C40.6605 36.6026 40.2079 36.9142 39.788 37.2651C39.588 37.4258 39.4633 37.6718 39.2862 37.9047Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M57.8636 44.117C57.2437 49.1188 51.5793 53.9534 46.0428 54.2847C39.4567 54.6816 33.6676 50.562 32.09 44.3629C30.496 38.0917 33.5725 31.5942 39.3747 28.9211C45.1605 26.2545 51.7728 28.1372 55.2528 32.5913C54.7641 32.9423 54.2786 33.2932 53.7637 33.6638C52.432 32.1288 50.8774 30.9415 48.9848 30.2921C44.6258 28.803 40.6145 29.4918 37.2296 32.6372C33.8021 35.8188 32.7132 39.8399 34.058 44.2973C35.4027 48.7548 38.5383 51.4574 43.1433 52.2741C47.8303 53.1072 52.4419 50.8933 54.8493 46.754C55.2233 46.1111 55.6628 45.6027 56.2827 45.2124C56.8107 44.8812 57.306 44.5073 57.8636 44.117Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_849_682"
                          x="0"
                          y="0"
                          width="89.9963"
                          height="90"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="7.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_849_682"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_849_682"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </FeatureIcon1>

                  <Heading type={4}>Always Reliable</Heading>

                  <div
                    className={
                      'font-Outfit font-light text-gray_text-0 group-hover:text-white '
                    }
                  >
                    With our chatbot, you can be confident in its ability to
                    provide accurate answers. If it doesn&apos;t have the
                    answer, no worries! It&apos;ll tag in a human teammate to
                    assist.
                  </div>
                </div>
                <div
                  className={
                    'transtion group flex flex-col space-y-3 rounded-2xl bg-transparent py-12 text-center duration-300 hover:border hover:bg-gradient-to-br hover:shadow-3xl' +
                    ' border border-gray_text-0 border-opacity-20 from-tulip-0 to-tulip-1 p-7 hover:border-transparent'
                  }
                >
                  <FeatureIcon1>
                    <svg
                      width="90"
                      height="94"
                      viewBox="0 0 90 94"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_849_718)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.8562 51.9882C17.5934 50.506 15.0397 47.627 15.0005 43.1064C14.9575 38.5896 17.4526 35.6562 21.6841 34.065C20.9919 30.9254 21.5238 28.0115 23.5535 25.4632C25.5871 22.9111 28.3051 21.705 31.4063 21.6584C31.4767 20.2889 31.3672 18.9195 31.6449 17.6357C32.5678 13.3912 36.5881 10.5901 40.8822 11.0491C45.2114 11.5121 48.4652 15.0913 48.5591 19.4953C48.5786 20.4173 48.563 21.3432 48.563 22.3664C49.705 22.347 50.7296 22.6193 51.7464 21.7089C54.2649 19.4447 56.8891 17.3011 59.5093 15.1536C59.9004 14.8345 60.4831 14.64 60.9954 14.605C62.1452 14.5233 63.3067 14.5622 64.4643 14.5894C64.9375 14.6011 65.2034 14.5038 65.4224 14.0059C66.3728 11.8156 68.7114 10.6251 70.9679 11.1114C73.3418 11.621 74.9922 13.6129 75 15.9744C75.0039 18.3359 73.3614 20.3395 70.9914 20.8608C68.7388 21.3549 66.4119 20.1761 65.4263 17.9897C65.2308 17.5539 64.9923 17.4606 64.5386 17.3983C62.2117 17.0832 60.3736 17.8068 58.6881 19.4797C56.8617 21.2927 54.7538 22.8294 52.7984 24.5178C52.2118 25.0275 51.6017 25.2959 50.8195 25.2493C50.0999 25.2065 49.3725 25.2415 48.606 25.2415C48.606 28.3344 48.606 31.3495 48.606 34.4579C50.2407 34.4579 51.8637 34.4696 53.4906 34.4423C53.6666 34.4384 53.8621 34.2128 54.0068 34.0572C54.6521 33.3569 55.2622 32.6177 55.927 31.9408C56.2986 31.5634 56.3337 31.2716 56.1108 30.7775C54.9415 28.1865 56.2086 25.1714 58.8523 24.1482C61.5077 23.1212 64.4839 24.4828 65.3873 27.1828C66.0208 29.0774 65.6375 30.8126 64.2453 32.2481C62.8726 33.6643 61.1518 34.0767 59.2629 33.5398C58.688 33.3764 58.3596 33.4503 57.9841 33.8977C57.2606 34.7614 56.4472 35.5511 55.7354 36.4265C55.1723 37.119 54.5113 37.3602 53.6353 37.333C51.981 37.2824 50.3229 37.3174 48.6138 37.3174C48.6138 38.7335 48.6138 40.0951 48.6138 41.5424C48.8407 41.5579 49.0792 41.593 49.3139 41.593C52.7084 41.5969 56.103 41.5891 59.5015 41.6046C59.9552 41.6046 60.1976 41.5035 60.3971 41.0444C61.3591 38.8502 63.6821 37.652 65.9387 38.1266C68.3047 38.6246 69.9707 40.6204 69.9902 42.9819C70.0098 45.355 68.3243 47.3975 65.923 47.8994C63.6743 48.3701 61.3904 47.1524 60.3619 44.9777C60.2524 44.7442 59.9356 44.4563 59.7088 44.4525C56.1108 44.4213 52.5168 44.433 48.9189 44.4369C48.8211 44.4369 48.7273 44.4758 48.5943 44.503C48.5943 45.8802 48.5943 47.2458 48.5943 48.7047C50.096 48.7047 51.5782 48.7903 53.0448 48.6775C54.3862 48.5763 55.3561 48.9848 56.146 50.0625C56.7053 50.825 57.4327 51.4669 58.0428 52.1983C58.3791 52.599 58.6724 52.6652 59.1886 52.5018C61.7854 51.6848 64.4995 53.0737 65.3873 55.6141C66.2633 58.1196 65.0001 60.874 62.5285 61.8583C60.62 62.6169 58.4808 62.154 57.0494 60.6717C55.6572 59.2283 55.2583 57.0964 56.1108 55.2484C56.3377 54.7543 56.2868 54.4626 55.9192 54.0852C55.1331 53.2799 54.5426 52.0933 53.5962 51.6809C52.6224 51.2568 51.3279 51.5603 50.1703 51.5486C49.6697 51.5447 49.1692 51.5486 48.6138 51.5486C48.6138 54.6298 48.6138 57.6605 48.6138 60.7729C49.4429 60.7729 50.2486 60.7028 51.0346 60.7962C51.5743 60.8623 52.1844 61.0374 52.5911 61.372C55.3091 63.5973 57.9685 65.8927 60.6786 68.1297C60.9915 68.3903 61.4686 68.5382 61.8832 68.5732C62.7318 68.6393 63.5922 68.5615 64.4447 68.6043C64.9727 68.6315 65.2269 68.4526 65.4498 67.9585C66.4119 65.8226 68.7427 64.6633 70.9758 65.1457C73.2831 65.6476 74.9257 67.5811 74.9883 69.8765C75.0508 72.2457 73.4513 74.3038 71.1127 74.8601C68.8248 75.4009 66.4666 74.296 65.485 72.1407C65.2386 71.596 64.9649 71.4015 64.3743 71.4287C63.295 71.4793 62.2117 71.4249 61.1323 71.4482C60.4675 71.4638 59.9317 71.2576 59.4233 70.8218C56.9438 68.7015 54.3784 66.6746 51.9732 64.4804C50.929 63.5273 49.8536 63.5623 48.6686 63.6518C48.5513 64.8306 48.5356 65.986 48.3049 67.0987C47.2881 72.0551 42.7046 75.4009 37.6206 74.9613C32.6148 74.5294 28.661 70.3239 28.5397 65.2896C28.528 64.8967 28.5084 64.6321 28.0352 64.4493C22.9551 62.5002 20.4405 57.6566 21.7545 52.4162C21.7897 52.2722 21.821 52.1322 21.8562 51.9882ZM45.6299 34.4073C45.6612 34.3101 45.6886 34.2634 45.6886 34.2167C45.6925 29.2642 45.7746 24.3116 45.6729 19.3591C45.5869 15.2625 41.3163 12.6831 37.6128 14.356C34.4763 15.7721 33.3344 19.4992 35.1099 22.5337C35.6222 23.4129 35.5635 24.1055 34.9261 24.6112C34.3864 25.0392 33.8154 24.9108 33.2092 24.7513C30.1431 23.9498 26.9558 25.2337 25.3133 27.9025C23.6669 30.5752 23.9524 33.9833 26.0525 36.3331C27.4251 37.8737 29.1772 38.6479 31.2343 38.7296C31.8913 38.7568 32.4231 38.9591 32.7008 39.5816C33.174 40.6398 32.3488 41.6319 31.0544 41.5658C27.7263 41.3985 25.0904 39.9629 23.1546 37.2668C22.9277 36.9517 22.7596 36.765 22.3137 36.8972C19.5019 37.722 17.4761 40.8149 17.8867 43.7055C18.3365 46.8995 20.5187 48.9809 23.8546 49.3933C25.2625 49.5684 25.7787 50.4787 25.1256 51.7081C24.4373 53.0075 24.187 54.3847 24.3082 55.8398C24.5272 58.4891 26.6665 61.1463 29.0951 61.7416C29.1694 61.5665 29.2476 61.3836 29.3258 61.2047C30.3582 58.8354 32.0399 57.0847 34.3981 55.9954C35.7395 55.3729 37.1552 55.0539 38.6374 55.1161C39.4039 55.1473 39.9632 55.7503 39.9866 56.4739C40.0101 57.1858 39.4704 57.8005 38.7156 57.9095C38.4184 57.9523 38.1134 57.9523 37.8161 57.9912C34.9104 58.3608 32.8651 59.8975 31.86 62.6208C30.8432 65.383 31.4415 67.9079 33.4751 70.0321C35.4462 72.094 38.5396 72.7048 41.1951 71.6544C43.8974 70.5845 45.6847 68.013 45.7042 65.0484C45.7316 60.7456 45.712 56.4428 45.7081 52.1438C45.7081 51.9727 45.6846 51.8015 45.6729 51.642C41.985 50.8678 40.9174 50.4048 39.4743 48.8759C37.8122 47.1096 37.0496 45.0049 37.1278 42.585C37.2647 38.2122 40.4559 35.131 45.6299 34.4073ZM45.6534 48.6386C45.6534 44.8843 45.6534 41.13 45.6534 37.3796C42.8219 37.1112 40.0453 39.7917 39.9827 42.8068C39.9162 46.0514 42.5912 48.8253 45.6534 48.6386ZM64.961 45.1177C66.1538 45.1255 67.1315 44.1723 67.1354 43.0013C67.1354 41.8575 66.1968 40.9044 65.0431 40.881C63.8386 40.8577 62.8648 41.7719 62.8374 42.9585C62.81 44.1373 63.7682 45.1099 64.961 45.1177ZM70.0567 13.8658C68.8444 13.8347 67.8823 14.7373 67.855 15.9316C67.8276 17.1066 68.7153 18.0558 69.8768 18.0986C71.0853 18.1453 72.0786 17.2544 72.1295 16.0717C72.1803 14.8968 71.2417 13.8969 70.0567 13.8658ZM69.9902 67.8962C68.7818 67.8962 67.8471 68.8299 67.855 70.0282C67.8628 71.1992 68.774 72.1135 69.9472 72.1329C71.1439 72.1524 72.1216 71.2148 72.1334 70.036C72.1451 68.8611 71.183 67.9001 69.9902 67.8962ZM62.8218 28.8012C62.8296 27.6107 61.8793 26.6459 60.6943 26.6459C59.5171 26.6459 58.5473 27.6185 58.5551 28.7973C58.5629 29.9567 59.4858 30.8826 60.6552 30.902C61.8597 30.9254 62.8139 29.9995 62.8218 28.8012ZM62.8218 57.2014C62.8139 56.0032 61.8597 55.0811 60.6513 55.1006C59.482 55.12 58.559 56.0459 58.5512 57.2053C58.5433 58.3841 59.5132 59.3567 60.6904 59.3567C61.8793 59.3567 62.8335 58.3919 62.8218 57.2014Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_849_718"
                          x="0"
                          y="0"
                          width="90"
                          height="94"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="7.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_849_718"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_849_718"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </FeatureIcon1>

                  <Heading type={4}>Chat Analytics</Heading>

                  <div
                    className={
                      'font-Outfit font-light text-gray_text-0 group-hover:text-white '
                    }
                  >
                    Monitor and analyze customer interactions with automated
                    metrics and visual aids.
                  </div>
                </div>
                <div
                  className={
                    'transtion group flex flex-col space-y-3 rounded-2xl bg-transparent py-12 text-center duration-300 hover:border hover:bg-gradient-to-br hover:shadow-3xl' +
                    ' border border-gray_text-0 border-opacity-20 from-tulip-0 to-tulip-1 p-7 hover:border-transparent'
                  }
                >
                  <FeatureIcon1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="90"
                      viewBox="0 0 90 90"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_849_708)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M45.0104 11.0027C52.2899 11.0027 59.5695 10.9944 66.8532 11.0069C70.9015 11.0152 74.0415 13.5161 74.8379 17.3733C74.9664 17.9955 74.9913 18.6425 74.9913 19.2812C74.9996 33.7603 75.0038 48.2393 74.9955 62.7184C74.9913 67.654 71.6398 70.9969 66.6997 70.9969C52.2194 71.001 37.7391 71.001 23.2588 70.9969C19.1192 70.9969 15.9876 68.5457 15.1663 64.6678C15.0377 64.0498 15.0087 63.3986 15.0087 62.7599C15.0004 48.2559 14.9962 33.7478 15.0045 19.2439C15.0045 14.3622 18.3685 11.011 23.2588 11.0069C30.5052 10.9986 37.7557 11.0027 45.0104 11.0027ZM18.1362 26.8131C18.1362 27.1947 18.1362 27.485 18.1362 27.7754C18.1362 39.4009 18.1362 51.0306 18.1362 62.6562C18.1362 65.8705 20.1064 67.8572 23.3128 67.8572C37.7682 67.8614 52.2236 67.8614 66.6748 67.8572C69.877 67.8572 71.8514 65.8705 71.8514 62.6562C71.8514 51.0016 71.8514 39.3512 71.8514 27.6966C71.8514 27.4145 71.8514 27.1325 71.8514 26.8131C53.9076 26.8131 36.08 26.8131 18.1362 26.8131ZM30.8163 23.5656C44.5002 23.5656 58.1343 23.5656 71.8514 23.5656C71.8514 22.0725 71.8555 20.6416 71.8514 19.2065C71.8389 16.1581 69.8314 14.1424 66.7785 14.1424C55.069 14.1383 43.3637 14.1424 31.6583 14.1424C31.3762 14.1424 31.0942 14.1673 30.8163 14.1797C30.8163 17.3609 30.8163 20.4425 30.8163 23.5656ZM27.5602 23.5781C27.5602 20.4301 27.5602 17.3277 27.5602 14.1424C27.2408 14.1424 26.9836 14.1383 26.7223 14.1424C25.2291 14.1631 23.7234 14.0594 22.2509 14.2336C19.841 14.5115 18.1943 16.4567 18.1403 18.8872C18.1113 20.2725 18.132 21.6619 18.1403 23.0472C18.1403 23.2214 18.1942 23.3956 18.2233 23.5781C21.3549 23.5781 24.4368 23.5781 27.5602 23.5781Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M49.7298 37.97C49.6842 38.1359 49.6303 38.3972 49.5432 38.6502C47.5068 44.7595 45.4828 50.8771 43.4048 56.974C43.2348 57.4717 42.7869 58.0607 42.3348 58.2183C41.8869 58.3717 41.1776 58.1685 40.7463 57.8823C40.1656 57.4966 40.1615 56.7957 40.3813 56.1362C41.1735 53.7638 41.9657 51.3914 42.7578 49.019C44.0311 45.2075 45.3003 41.3959 46.5777 37.5843C46.9261 36.5474 47.6685 36.0912 48.5644 36.34C49.2695 36.5266 49.7464 37.1571 49.7298 37.97Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M31.4216 47.3103C33.1635 49.0481 34.8474 50.6781 36.4525 52.3786C36.8092 52.756 37.1078 53.4362 37.0249 53.909C36.9419 54.3736 36.4069 54.9667 35.9507 55.0994C35.4986 55.2321 34.7603 55.0164 34.387 54.6846C33.1138 53.5523 31.9483 52.2998 30.7455 51.097C29.8994 50.2509 29.0409 49.409 28.2031 48.5504C27.4275 47.7499 27.415 46.8748 28.1906 46.0909C30.2146 44.0462 32.2469 42.0097 34.2958 39.9857C35.0465 39.2433 35.9838 39.2475 36.635 39.9318C37.2488 40.5788 37.224 41.4996 36.5147 42.2171C34.8557 43.9052 33.1677 45.5683 31.4216 47.3103Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M58.5403 47.2895C56.9974 45.7508 55.4877 44.2452 53.978 42.7397C53.7706 42.5323 53.555 42.3332 53.36 42.1134C52.7669 41.4457 52.7628 40.5539 53.3393 39.9401C53.9407 39.2972 54.8739 39.2433 55.5624 39.8779C56.3463 40.5996 57.0845 41.3751 57.8394 42.13C59.1044 43.3908 60.3694 44.6517 61.6302 45.9208C62.6256 46.9204 62.6173 47.7167 61.6095 48.7329C59.6892 50.6615 57.7647 52.5818 55.8361 54.5021C54.9817 55.3524 54.0734 55.427 53.3766 54.7261C52.6881 54.0376 52.7752 53.1085 53.613 52.2666C55.0605 50.8108 56.5163 49.3633 57.968 47.9075C58.1463 47.725 58.3163 47.5301 58.5403 47.2895Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_849_708"
                          x="0"
                          y="0"
                          width="90"
                          height="90"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="7.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_849_708"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_849_708"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </FeatureIcon1>

                  <Heading type={4}>Own your branding</Heading>

                  <div
                    className={
                      'font-Outfit font-light text-gray_text-0 group-hover:text-white '
                    }
                  >
                    Match your chatbot with your brand&apos;s look and feel
                    easily.
                  </div>
                </div>
                <div
                  className={
                    'transtion group flex flex-col space-y-3 rounded-2xl bg-transparent py-12 text-center duration-300 hover:border hover:bg-gradient-to-br hover:shadow-3xl' +
                    ' border border-gray_text-0 border-opacity-20 from-tulip-0 to-tulip-1 p-7 hover:border-transparent'
                  }
                >
                  <FeatureIcon1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="93"
                      height="90"
                      viewBox="0 0 93 90"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_849_686)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.9759 46.4304C20.0758 45.5955 20.0896 44.8362 20.2722 44.118C20.727 42.3108 21.9467 41.1013 23.5385 40.2217C25.0958 39.3628 26.822 39.0398 28.5447 38.7546C30.3329 38.4591 32.1314 38.2461 34.0057 37.9884C34.0057 36.9542 34.0229 35.8753 33.9885 34.8033C33.9816 34.6281 33.768 34.4425 33.6198 34.2913C32.1727 32.8173 31.9212 30.6424 33.01 28.9313C34.0643 27.2718 36.135 26.5365 38.0058 27.1618C39.9353 27.8044 41.1377 29.6563 40.9275 31.6972C40.8242 32.6971 40.3797 33.5389 39.6975 34.281C39.4874 34.5078 39.3427 34.8755 39.3254 35.1881C39.2772 36.1124 39.3082 37.0401 39.3082 38.009C40.397 38.1258 41.4581 38.1739 42.4918 38.3663C44.3592 38.7099 46.2404 39.0398 48.0596 39.5723C49.0932 39.8747 50.0889 40.4622 50.971 41.1013C52.4491 42.1699 53.1967 43.6954 53.2277 45.5405C53.2312 45.8223 53.2277 46.104 53.2277 46.372C53.81 46.4407 54.3234 46.4579 54.8126 46.5713C56.7868 47.0283 58.1857 48.7497 58.2374 50.77C58.2615 51.7423 58.2546 52.7147 58.2443 53.6871C58.2167 56.2915 56.3286 58.1847 53.7135 58.2396C53.5826 58.2431 53.4517 58.2534 53.2966 58.2603C53.2725 58.3771 53.2312 58.4801 53.2346 58.5832C53.3449 60.8303 51.7255 62.4589 49.5583 62.8541C43.9802 63.8711 38.3435 64.2078 32.6861 63.8608C29.9952 63.6959 27.3112 63.3454 24.6341 63.0087C21.5505 62.6204 20.3618 61.3663 20.0138 58.2774C19.7175 58.2774 19.4178 58.2774 19.0181 58.2774C19.0181 58.7481 19.0181 59.2257 19.0181 59.6999C19.0181 60.8715 19.0112 62.0432 19.0215 63.2114C19.0388 65.4035 20.603 66.9771 22.7839 66.9978C23.8245 67.0081 24.8684 66.9875 25.9089 67.0046C26.2742 67.0115 26.4912 66.9462 26.66 66.558C27.1906 65.3588 28.1622 64.7232 29.4715 64.6785C30.6223 64.6407 31.7765 64.6373 32.9273 64.6751C34.743 64.7369 36.0557 66.1147 36.0385 67.8842C36.0213 69.6434 34.6603 70.9697 32.8342 70.9937C31.7696 71.0075 30.7084 70.9937 29.6438 70.9972C28.2346 71.0006 27.2216 70.3546 26.6428 69.0937C26.474 68.7295 26.2638 68.6848 25.9296 68.6814C24.6445 68.6745 23.3524 68.7432 22.0811 68.6058C19.3488 68.3172 17.4194 66.1491 17.3677 63.4107C17.3333 61.7305 17.3471 60.0504 17.3677 58.3736C17.3746 57.9132 17.2644 57.6143 16.8647 57.3326C15.7759 56.5629 15.1523 55.4669 15.0696 54.1475C14.9904 52.938 14.9628 51.7114 15.0731 50.5054C15.2936 48.1071 17.1679 46.4751 19.5969 46.4407C19.7278 46.4304 19.8553 46.4304 19.9759 46.4304ZM21.7503 52.0447C21.7503 54.12 21.7503 56.1987 21.7503 58.274C21.7503 60.0332 22.4428 60.954 24.2069 61.2323C26.4361 61.5828 28.6791 61.8645 30.9255 62.0672C35.2598 62.4589 39.6011 62.3937 43.932 61.9332C45.758 61.7408 47.5841 61.5003 49.3826 61.1464C50.9469 60.8406 51.567 59.9404 51.567 58.3736C51.567 54.199 51.5567 50.0209 51.5739 45.8463C51.5808 44.252 50.9537 42.9808 49.6169 42.163C48.7246 41.6201 47.7357 41.1426 46.7262 40.8883C40.7553 39.3834 34.7292 39.2562 28.6791 40.4073C27.0942 40.7096 25.4989 41.0017 24.0863 41.8607C22.5496 42.7918 21.6952 44.0837 21.7434 45.946C21.7882 47.9766 21.7503 50.0106 21.7503 52.0447ZM37.6165 37.9403C37.6165 36.7858 37.6372 35.6657 37.6062 34.549C37.5924 34.013 37.7646 33.6523 38.2022 33.319C39.4874 32.3432 39.6286 30.5565 38.5502 29.4227C37.5131 28.3301 35.7284 28.3507 34.7086 29.4639C33.6439 30.6287 33.8127 32.3775 35.1289 33.3499C35.5355 33.6488 35.6836 33.989 35.6733 34.4666C35.656 35.4149 35.6664 36.3632 35.6698 37.3115C35.6698 37.5211 35.6939 37.7307 35.7077 37.9369C36.3761 37.9403 36.9653 37.9403 37.6165 37.9403ZM53.276 48.1965C53.276 50.9864 53.276 53.7317 53.276 56.4701C55.0297 56.7485 56.4733 55.6077 56.5767 53.8417C56.6353 52.8315 56.6353 51.8111 56.5767 50.8009C56.463 49.0314 54.9573 47.8494 53.276 48.1965ZM20.0414 48.1999C18.4255 47.8666 16.8509 48.997 16.7544 50.5913C16.6855 51.7355 16.689 52.8899 16.751 54.0341C16.844 55.6627 18.484 56.8378 20.0414 56.4323C20.0414 53.7042 20.0414 50.9727 20.0414 48.1999ZM31.2287 66.3278C30.6533 66.3278 30.0779 66.3071 29.5025 66.3312C28.6618 66.3656 28.0658 66.9531 28.0313 67.7434C27.9934 68.5542 28.5033 69.2483 29.3406 69.2964C30.5775 69.3685 31.8213 69.3651 33.0547 69.3033C33.8748 69.262 34.4433 68.5405 34.4157 67.7777C34.3847 66.9703 33.7507 66.3587 32.8928 66.3312C32.3347 66.314 31.7799 66.3278 31.2287 66.3278Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M74.803 22.3928C76.2019 24.0489 77.17 25.8837 77.6558 27.9693C79.5233 35.9681 73.5627 43.6817 65.3315 43.802C60.3391 43.8776 56.5216 41.6751 53.8927 37.4559C53.6033 36.9886 53.3139 36.8477 52.8005 36.8511C49.2104 36.8717 45.6237 36.8614 42.0336 36.8614C41.8337 36.8614 41.6029 36.9198 41.441 36.8408C41.1481 36.6965 40.7725 36.5178 40.6623 36.2567C40.5658 36.0334 40.7002 35.5901 40.8862 35.3874C41.6477 34.5559 42.4642 33.776 43.2705 32.9857C43.429 32.8311 43.6185 32.7143 43.8149 32.5631C43.6495 32.3295 43.5599 32.1886 43.4531 32.058C40.1455 27.9556 39.6321 22.3722 42.1404 17.7578C44.6211 13.1983 49.6411 10.508 54.8299 11.0749C59.1298 11.5457 62.4339 13.6759 64.6804 17.3764C64.956 17.8334 65.2282 18.012 65.7622 18.0086C69.3524 17.9846 72.939 17.9949 76.5292 17.9983C76.729 17.9983 76.9564 17.9399 77.1218 18.0155C77.4181 18.1563 77.7937 18.3247 77.9073 18.5824C78.0073 18.8057 77.8764 19.2524 77.6903 19.4551C76.9289 20.2866 76.1088 21.0631 75.3129 21.8603C75.1476 22.0252 74.9856 22.2004 74.803 22.3928ZM75.0752 19.8434C75.0339 19.7815 74.9891 19.7197 74.9477 19.6578C71.7159 19.6578 68.4841 19.6578 65.2523 19.6578C59.0161 19.6613 54.2028 24.1589 53.7859 30.3744C53.3139 37.4181 60.0015 43.3381 66.9543 41.9912C71.3128 41.146 74.3448 38.6275 75.7333 34.4219C77.1218 30.2164 76.1674 26.4128 73.1906 23.1247C72.6531 22.5303 72.6393 22.1592 73.2078 21.5991C73.8176 21.0047 74.4516 20.4309 75.0752 19.8434ZM63.154 18.0876C63.0576 17.9158 63.0024 17.799 62.9266 17.6925C60.191 13.8855 56.4699 12.1366 51.8324 12.8273C47.4222 13.4835 44.342 16.057 42.8915 20.2763C41.441 24.4922 42.3678 28.3198 45.3343 31.6492C45.9476 32.3398 45.9579 32.6524 45.2929 33.319C44.7107 33.9031 44.1284 34.4838 43.4875 35.1229C46.6608 35.1229 49.6962 35.1229 52.7488 35.1229C50.2096 27.076 55.3364 19.3692 63.154 18.0876Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M36.6518 52.1512C34.2159 52.1512 31.78 52.1683 29.3441 52.1443C27.5042 52.1271 26.0881 50.8112 25.8573 48.9695C25.6471 47.2962 26.7428 45.6642 28.4207 45.1934C28.7342 45.1041 29.0753 45.0595 29.4027 45.0595C34.2297 45.0526 39.0567 45.0423 43.8803 45.0595C45.6616 45.0663 47.0191 46.207 47.3912 47.9078C47.7289 49.4608 46.9123 51.141 45.4239 51.7938C44.914 52.0172 44.3179 52.1271 43.7563 52.1374C41.3893 52.1752 39.0223 52.1546 36.6518 52.1512ZM36.6449 46.7121C34.2986 46.7121 31.9488 46.7087 29.6025 46.7121C28.3828 46.7156 27.5387 47.4646 27.5111 48.5503C27.4835 49.6704 28.3139 50.4882 29.568 50.4916C34.2848 50.5054 39.0016 50.5054 43.7218 50.4847C44.1043 50.4847 44.5212 50.3748 44.8588 50.1996C45.6065 49.8079 45.9304 48.9214 45.7133 48.0899C45.4997 47.279 44.7555 46.7156 43.8218 46.7121C41.4306 46.7052 39.0395 46.7121 36.6449 46.7121Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M65.0593 33.8619C63.4158 33.8653 62.0927 32.57 62.079 30.9414C62.0652 29.275 63.3917 27.9556 65.0661 27.9659C66.6993 27.9762 68.0258 29.299 68.0223 30.9208C68.0223 32.5356 66.6889 33.8585 65.0593 33.8619ZM66.3341 30.8967C66.3272 30.2061 65.7552 29.6289 65.0661 29.6186C64.3495 29.6048 63.7638 30.1958 63.7672 30.9276C63.7741 31.632 64.3288 32.1955 65.0283 32.2092C65.738 32.2195 66.341 31.6114 66.3341 30.8967Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M71.5506 33.8619C69.9036 33.8653 68.5944 32.5734 68.584 30.9345C68.5737 29.2612 69.8899 27.9522 71.5712 27.9625C73.2044 27.9728 74.524 29.2956 74.5171 30.9208C74.5102 32.5494 73.1906 33.8585 71.5506 33.8619ZM72.8391 30.9002C72.8323 30.1924 72.2052 29.5911 71.4989 29.6186C70.8098 29.6461 70.2551 30.2302 70.2585 30.9242C70.2654 31.6217 70.8305 32.1921 71.523 32.2058C72.2328 32.2196 72.8495 31.6045 72.8391 30.9002Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M58.5475 33.8618C56.9109 33.8618 55.581 32.5562 55.5706 30.931C55.5603 29.2749 56.904 27.9486 58.575 27.9624C60.2116 27.9761 61.5312 29.3058 61.5243 30.9241C61.5174 32.5459 60.184 33.8618 58.5475 33.8618ZM59.8292 30.931C59.8395 30.2026 59.2538 29.6116 58.5337 29.6185C57.8377 29.6254 57.2796 30.1923 57.2692 30.8932C57.2589 31.6251 57.8446 32.2195 58.5612 32.2092C59.2538 32.1989 59.8188 31.6251 59.8292 30.931Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M49.9201 21.9084C48.5282 21.9084 47.1362 21.9119 45.7443 21.9084C45.0207 21.905 44.6417 21.6026 44.6555 21.0529C44.6693 20.534 45.0345 20.2351 45.7236 20.2351C48.4868 20.2283 51.2501 20.2283 54.0133 20.2351C54.7299 20.2351 55.1262 20.565 55.1089 21.101C55.0952 21.6095 54.7058 21.9084 54.0305 21.9084C52.6592 21.9119 51.288 21.9084 49.9201 21.9084Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M48.2801 26.7393C47.3085 26.7393 46.3369 26.7496 45.3653 26.7359C44.6865 26.7256 44.3144 26.4095 44.3558 25.8769C44.4006 25.2722 44.7899 25.0729 45.355 25.0763C47.343 25.0866 49.3275 25.0866 51.3155 25.0763C51.8875 25.0729 52.2699 25.2825 52.3354 25.8666C52.394 26.3751 51.9805 26.7256 51.3259 26.7324C50.3095 26.7496 49.2931 26.7393 48.2801 26.7393Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_849_686"
                          x="0"
                          y="0"
                          width="93"
                          height="90"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="7.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_849_686"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_849_686"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </FeatureIcon1>

                  <Heading type={4}>Simple Integration</Heading>

                  <div
                    className={
                      'font-Outfit font-light text-gray_text-0 group-hover:text-white '
                    }
                  >
                    No headaches - just copy and paste our API to embed your new
                    chatbot into your website.
                  </div>
                </div>
              </div>
            </div>
            {/* <Button
              variant={'normal'}
              size={'normal'}
              className={'h-[60px] hover:bg-btncolor-0 border rounded-lg border-btncolor-0 group transition ease-linear	delay-75 hover:shadow-btn-shadow	'}
              href="#waitlist"
            >
              <span
                className={
                  'flex items-center space-x-2 font-Outfit	text-lg font-medium group-hover:text-black-700 text-bg-btncolor-0'
                }
              >
                <span>Build Your Chatbot</span>
                <ArrowSmallRightIcon className={'h-6 hidden	group-hover:block'} />
              </span>
            </Button> */}
          </div>
        </Container>
        <BlendUpperWithBottom />
      </div>

      <div className={'price-background'} id="pricing">
        <Pricing />
        <BlendUpperWithBottom />
      </div>

      <div className="faq " id="faqs">
        <FaqBlock />
      </div>
      {/* <div className="cta overflow-hidden bg-dark_blue-0" id="waitlist"> */}
      {/* <Container> */}
      {/* <div className=" mx-auto max-w-7xl  px-10 pb-14 pt-24">
          <div
            className={
              'relative flex w-full flex-col items-center rounded-md p-16 px-5 md:flex-row lg:my-0' +
              'mx-auto flex-1 justify-center bg-gradient-to-br from-logocolor-100 to-logocolor-200 ' +
              "after:absolute after:right-0 after:h-96 after:w-80 after:bg-pack-train after:bg-contain after:bg-center after:bg-no-repeat after:blur-md after:content-[''] " +
              "before:absolute before:left-0 before:h-96 before:w-80 before:bg-pack-train before:bg-contain before:bg-center before:bg-no-repeat	before:blur-md before:content-[''] "
            }
          >
            <div
              className={
                'flex w-full flex-col items-center space-y-5  lg:w-2/3'
              }
            >
              <h1
                className={
                  'flex flex-row text-center font-Outfit text-7xl font-bold capitalize text-white 1xs:text-4xl sm:block sm:text-4xl lg:text-center xl:text-7xl 2xl:text-7xl'
                }
              >
                <span>
                  Be the First to Try Our <br /> Game-Changing Product.
                </span>
              </h1>
              <p className="text-center	 font-Outfit text-lg font-normal	 text-white">
                Join our waitlist today and receive exclusive early access to
                our next-level product. Plus, get three months of free access
                when we go live!
              </p>

              <FirebaseFirestoreProvider>
                <JoinWaitlistForm />
              </FirebaseFirestoreProvider>
            </div>
          </div>
        </div> */}
      {/* </Container> */}
      {/* </div> */}
      <Footer />
      <iframe
        src="https://withai.tawk/chatbot-iframe/?chatbotid=aiwith4ce02aac56d7"
        style={{
          position: 'fixed',
          bottom: '0',
          background: 'transparent',
          right: '0',
        }}
        frameBorder="0"
        id="chatbot-twakwith"
        height="120"
        width="120"
      ></iframe>
      <Script>
        {`window.addEventListener(
        "message",
        function (e) {
          var iframe = document.getElementById("chatbot-twakwith");
          var dataWidth = e.data[0];
          var dataHeight = e.data[1];
          iframe.width = dataWidth;
          iframe.height = dataHeight;
        },
        false
      )`}
        ;
      </Script>
    </Layout>
  );
};

const BlendUpperWithBottom = () => {
  // return <div className={`h-12 border-0 border-white absolute w-full z-[1] translate-y-[-50%] bg-gradient-to-b from-[${upperBackgroundColor}] to-[${bottomBackgroundColor}] blur-md bg-[#000d21]`} />
  return (
    <div
      className={`drop-back z-100 absolute -bottom-[30px] h-[369px] w-full blur-xl`}
    />
  );
};
const BlendUpperWithTop = () => {
  // return <div className={`h-12 border-0 border-white absolute w-full z-[1] translate-y-[-50%] bg-gradient-to-b from-[${upperBackgroundColor}] to-[${bottomBackgroundColor}] blur-md bg-[#000d21]`} />
  return (
    <div
      className={`drop-back1 z-100 absolute top-0 h-[369px] w-full rotate-180 blur-xl`}
    />
  );
};

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'pt-0 text-left text-5xl font-black text-white dark:text-white md:text-3xl lg:text-4xl' +
        '  mt-28 space-y-1 font-Outfit  1xs:mt-0 1xs:text-center 1xs:text-4xl sm:mt-0 sm:mt-0 sm:block sm:text-center sm:text-4xl md:mt-4 md:text-left lg:pt-0 xl:pt-28 xl:text-5xl '
      }
    >
      {children}
    </h1>
  );
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex justify-center'}>
      <div
        className={
          'fe-icon flex	place-items-center	 justify-center rounded-full bg-gray_text-0/[0.4]  from-tulip-0 to-tulip-1 p-4 group-hover:bg-gradient-to-r group-hover:transition-colors dark:bg-gray_text-0/[0.4]	'
        }
      >
        {props.children}
      </div>
    </div>
  );
}

function FeatureIcon1(props: React.PropsWithChildren) {
  return (
    <div className={'flex justify-center'}>
      <div
        className={
          'tw-icon flex	place-items-center	 justify-center rounded-full bg-gray_text-0/[0.4] from-tulip-0 to-tulip-1 p-4 group-hover:bg-gradient-to-r group-hover:transition-colors dark:bg-gray_text-0/[0.4]	'
        }
      >
        {props.children}
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <div
      className={
        'relative z-10 flex h-full flex-col items-start justify-center space-y-8  overflow-y-auto px-4 py-16 lg:items-center'
      }
    >
      <div
        className={
          'flex flex-col items-center justify-center 1xs:place-self-center sm:place-self-center	'
        }
      >
        <h1
          className={
            'flex flex-row space-x-2 text-center font-Outfit text-7xl font-bold text-white 1xs:block 1xs:text-4xl sm:block lg:text-left xl:text-7xl 2xl:text-7xl	'
          }
        >
          <span>Pricing </span>
          <span
            className={
              'bg-gradient-to-br bg-clip-text text-transparent' +
              ' from-logocolor-100 to-logocolor-200' +
              ' to-logocolor-200'
            }
          >
            And
          </span>
          <span>Packages</span>
        </h1>
      </div>

      <PricingTable />
    </div>
  );
}

const FAQ_LIST = [
  {
    question: `What makes your chatbot technology unique?`,
    answer: `Our chatbot technology uses advanced AI-driven natural language processing capabilities to provide instant assistance to your customers. It has been designed to handle complex queries and can provide accurate and efficient solutions to support requests.`,
  },
  {
    question: `How can I customize my chatbot to match my branding?`,
    answer: `Our platform includes a user-friendly interface to customize the chatbot to match the branding of your company or website. You can upload your own logo, choose colors and fonts, and even add custom messages to suit your brand identity.`,
  },
  {
    question: `What kind of data insights can I gain from the chatbot analytics?`,
    answer: `Our analytics tool provides a comprehensive dashboard of various metrics such as chats per day, user feedback, and frequently asked questions. These insights help you improve the quality of your chatbot interactions and provide a better overall customer experience.`,
  },
  {
    question: `Is it possible to integrate the chatbot with other software or platforms?`,
    answer: `Yes, we offer integrations with a variety of software and platforms such as Slack, Trello, and Zendesk, and we also provide custom integrations based on your business needs.`,
  },
  {
    question: `Can the chatbot speak multiple languages?`,
    answer: `Yes, our chatbot can be configured to speak multiple languages based on the needs of your business or customer base.`,
  },
  {
    question: `What kind of training or resources are available to help me get started with the chatbot?`,
    answer: `We offer 24/7 customer support and a knowledge base providing articles, tutorials, and documentation to help you get started.`,
  },
];

function FaqBlock() {
  const [activeFAQ, setActiveFAQ] = useState('');
  return (
    <div
      className={
        'mx-auto flex flex-col space-y-8 overflow-hidden bg-dark_blue-0 px-4 py-14 pb-24 sm:px-5 sm:py-7	'
      }
    >
      <div className={'flex flex-col items-center space-y-2'}>
        <h1
          className={
            'flex flex-row space-x-2 text-center font-Outfit text-7xl font-bold text-white 1xs:block 1xs:text-4xl sm:block sm:space-x-0 sm:text-4xl lg:text-left xl:text-7xl 2xl:text-7xl	'
          }
        >
          <span>Frequently</span>
          <span
            className={
              'bg-gradient-to-br bg-clip-text text-transparent' +
              ' from-logocolor-100 to-logocolor-200' +
              ' to-logocolor-200'
            }
          >
            {' '}
            Asked{' '}
          </span>
          <span>Questions</span>
        </h1>
      </div>

      <div className="m-auto flex w-full max-w-3xl flex-col space-y-4 ">
        {FAQ_LIST.map((item) => (
          <div key={item.question}>
            <details
              key={item.question}
              className={'rounded-lg font-Outfit text-white transition-colors'}
              onClick={() => {
                if (item.question === activeFAQ) {
                  setActiveFAQ('');
                } else {
                  setActiveFAQ(item.question);
                }
              }}
            >
              <summary
                className={`flex items-center justify-between rounded-lg border-gray_text-0 border-opacity-20 bg-gradient-to-b p-4 hover:cursor-pointer ${item.question === activeFAQ
                  ? 'border-0 from-logocolor-100 to-logocolor-200 text-white'
                  : 'border-[1px]'
                  }`}
              >
                <h2
                  className={
                    'font-Outfit text-lg font-medium text-white sm:text-base' +
                    ' cursor-pointer text-white'
                  }
                >
                  {item.question}
                </h2>

                <div>
                  <ChevronDownIcon
                    className={`h-5 transition duration-300 ${item.question === activeFAQ ? '-rotate-180' : ''
                      }`}
                  />
                </div>
              </summary>
            </details>
            <div
              className={`flex-col space-y-2 bg-transparent p-4 font-Outfit font-light text-gray_text-0 ${item.question === activeFAQ ? 'flex text-white' : 'hidden'
                }`}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
