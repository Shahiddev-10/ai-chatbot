import Link from 'next/link';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { GetStaticPropsContext } from 'next';
import React, { useState } from 'react';
import { withTranslationProps } from '~/lib/props/with-translation-props';
import configuration from '~/configuration';
import Layout from '~/core/ui/Layout';
import Container from '~/core/ui/Container';

import Footer from '~/components/Footer';
import SiteHeader from '../components/SiteHeader';

const Legal = () => {
    return (
        <>
            <Layout>
                <div
                    className={
                        "header-background pb-1 "
                    } id="legal"
                >
                    <SiteHeader />
                    <Container>
                        <div className={'flex h-full flex-1 flex-col px-5 py-10 sm:px-0 md:flex-row '} id="privacy">
                            <div className={'flex w-full flex-1 flex-col justify-center '}>
                                <div className="relative z-10 flex justify-center">
                                    <h1 className={'flex flex-row  text-center font-Outfit text-7xl font-bold text-white 1xs:block 1xs:text-4xl sm:block sm:text-4xl lg:text-left xl:text-7xl 2xl:text-7xl'}>
                                        <span>Terms and </span>
                                        <span className={'bg-gradient-to-br bg-clip-text text-transparent' + ' from-logocolor-100 to-logocolor-200' + ' to-logocolor-200'}>
                                            Conditions
                                        </span>
                                    </h1>

                                </div>
                                <span className='flex flex-row font-Outfit text-lg justify-center mt-[10px] place-items-center font-normal'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="url(#linear)" className="w-5 h-5 mr-1">
                                        <defs>
                                            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="rgba(32, 86, 190, 1)" />
                                                <stop offset="100%" stopColor="rgba(70, 127, 237, 1)" />
                                            </linearGradient>
                                        </defs>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />

                                    </svg>
                                    Last modified: March 2, 2023
                                </span>
                                <p className='text-center mt-7 font-Outfit text-lg text-gray_text-3'>By continuing to use our platform, you agree to these terms and conditions.</p>
                            </div>
                        </div>
                        <div className=' mb-10 ' id='refund'>
                            <h2 className='text-center font-Outfit text-[45px] font-semibold'>Billing & Refunds</h2>
                            <div className='text-center mt-5 '>
                                <p className='font-Outfit text-xl font-normal text-gray_text-3 my-[5px]'>We charge you for access to the product in monthly and yearly plans.</p>
                                <p className='font-Outfit text-xl font-normal text-gray_text-3 my-[5px]'>Due to the nature of our product, we currently do not offer refunds, either partial or in full.</p>
                                <p className='font-Outfit text-xl font-normal text-gray_text-3 my-[5px]'>You can easily cancel your subscription at any time you like. We will no longer charge you anything once you cancel your subscription.</p>
                                <p className='font-Outfit text-xl font-normal text-gray_text-3 my-[5px]'>We may change our pricing, pricing policies, features and access restrictions at any time.</p>
                            </div>
                        </div>
                        <div className=' mb-[50px]' id='emails'>
                            <h2 className='text-center font-Outfit text-[45px] font-semibold'>Emails</h2>
                            <div className='w-[70%] text-center mt-5 m-auto'>
                                <p className='font-Outfit text-xl font-normal text-gray_text-3 my-[5px] '>We may use your email to contact you about your account, product updates, and other marketing activities. You can unsubscribe from these emails at any time you like.</p>
                            </div>
                        </div>
                        <div className=' mb-[50px]' id='conditions'>
                            <h2 className='text-center font-Outfit text-[45px] font-semibold'>Conditions</h2>
                            <div className='text-center mt-5 m-auto'>
                                <p className='font-Outfit text-xl font-normal text-gray_text-3 my-[5px] '>We reserve the right to change / amend the policy at any time.</p>
                                <p className='font-Outfit text-xl font-normal text-gray_text-3 my-[5px] '>By continuing to use our platform, you agree to these terms and conditions.</p>
                            </div>
                        </div>
                        <div className=' mb-[50px]' id='queries'>
                            <h2 className='text-center font-Outfit text-[45px] font-semibold'>Have Any Queries?</h2>
                            <div className='text-center mt-[10px] m-auto'>
                                <Link href={'mailto:hello@withai.tawk'} className="font-Outfit font-bold     text-xl bg-gradient-to-br bg-clip-text text-transparent from-logocolor-100 to-logocolor-200 relative  after:bg-gradient-to-br after:from-logocolor-100 after:to-logocolor-200 after:w-full after:h-[2px] after:bottom-0 after:absolute after:block after:right-0">hello@withai.tawk</Link>

                            </div>
                        </div>
                    </Container>
                    <BlendUpperWithBottom />

                </div>
                <Footer />
            </Layout>
        </>
    );
};
const BlendUpperWithBottom = () => {
    // return <div className={`h-12 border-0 border-white absolute w-full z-[1] translate-y-[-50%] bg-gradient-to-b from-[${upperBackgroundColor}] to-[${bottomBackgroundColor}] blur-md bg-[#000d21]`} />
    return (
        <div
            className={`absolute h-[369px] w-full -bottom-[30px] drop-back z-100 blur-xl`}
        />
    );
};
export default Legal;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    const { props } = await withTranslationProps({ locale });

    return {
        props,
    };
}
