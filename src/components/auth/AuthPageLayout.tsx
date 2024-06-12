import Layout from '~/core/ui/Layout';
import Logo from '~/core/ui/Logo';
import Heading from '~/core/ui/Heading';
import SlideUpTransition from '~/core/ui/SlideUpTransition';

const AuthPageLayout: React.FCC<{
  heading: string | React.ReactNode;
}> = ({ children, heading }) => {
  return (
    <Layout>
      <SlideUpTransition>
        <div
          className={
            'flex min-h-screen	 flex-col items-center justify-center space-y-4' +
            ' header-background after:z-0 md:space-y-8	lg:pb-10 lg:pt-10 1xs:bg-none sm:bg-none md:bg-[url("/assets/images/background.png")]'
          }
        >
          <div className="logo-con">
            <Logo />
          </div>
          {/* <div className={`flex w-full max-w-sm flex-col items-center space-y-4 rounded-lg border-dark_blue-2 bg-dark_blue-0 py-0 dark:bg-dark_blue-0 md:w-8/12 md:border md:px-0 md:py-0 lg:w-5/12 lg:px-0   xl:w-4/12 2xl:w-3/12`}> */}
          <div
            className={`z-10 flex w-full max-w-md flex-col items-center space-y-4 rounded-lg border-dark_blue-2 bg-dark_blue-0 py-0 md:border`}
          >
            <div className="block w-full rounded-t-lg bg-gray_bg-0 py-5 text-center">
              <Heading type={2}>
                <span
                  className={
                    'text-center	font-Outfit font-semibold capitalize text-white'
                  }
                >
                  {heading}
                </span>
              </Heading>
            </div>

            {children}
          </div>
        </div>
      </SlideUpTransition>
    </Layout>
  );
};

export default AuthPageLayout;
