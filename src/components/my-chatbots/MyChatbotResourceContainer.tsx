import React from 'react';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import { useRouter } from 'next/router';

const links = [
  {
    path: (id: string) => `/my-chatbots/${id}/customize/resource/documents`,
    i18n: 'Documents',
    icon: (
      <>
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 17H9V12.825L10.6 14.425L12 13L8 9L4 13L5.425 14.4L7 12.825V17ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9Z" />
        </svg>
      </>
    ),
  },
  {
    path: (id: string) => `/my-chatbots/${id}/customize/resource/text`,
    i18n: 'Text',
    icon: (
      <>
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 5V0H5V2H2V5H0ZM18 5V2H15V0H20V5H18ZM0 22V17H2V20H5V22H0ZM15 22V20H18V17H20V22H15ZM5 17H15V5H5V17ZM5 19C4.45 19 3.97917 18.8042 3.5875 18.4125C3.19583 18.0208 3 17.55 3 17V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H15C15.55 3 16.0208 3.19583 16.4125 3.5875C16.8042 3.97917 17 4.45 17 5V17C17 17.55 16.8042 18.0208 16.4125 18.4125C16.0208 18.8042 15.55 19 15 19H5ZM7 9H13V7H7V9ZM7 12H13V10H7V12ZM7 15H13V13H7V15Z" />
        </svg>
      </>
    ),
  },
  {
    path: (id: string) => `/my-chatbots/${id}/customize/resource/website`,
    i18n: 'Website',
    icon: (
      <>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C12.4333 0 14.5625 0.7625 16.3875 2.2875C18.2125 3.8125 19.35 5.725 19.8 8.025H17.75C17.4333 6.80833 16.8625 5.72083 16.0375 4.7625C15.2125 3.80417 14.2 3.08333 13 2.6V3C13 3.55 12.8042 4.02083 12.4125 4.4125C12.0208 4.80417 11.55 5 11 5H9V7C9 7.28333 8.90417 7.52083 8.7125 7.7125C8.52083 7.90417 8.28333 8 8 8H6V10H8V13H7L2.2 8.2C2.15 8.5 2.10417 8.8 2.0625 9.1C2.02083 9.4 2 9.7 2 10C2 12.1833 2.76667 14.0583 4.3 15.625C5.83333 17.1917 7.73333 17.9833 10 18V20ZM19.1 19.5L15.9 16.3C15.55 16.5 15.175 16.6667 14.775 16.8C14.375 16.9333 13.95 17 13.5 17C12.25 17 11.1875 16.5625 10.3125 15.6875C9.4375 14.8125 9 13.75 9 12.5C9 11.25 9.4375 10.1875 10.3125 9.3125C11.1875 8.4375 12.25 8 13.5 8C14.75 8 15.8125 8.4375 16.6875 9.3125C17.5625 10.1875 18 11.25 18 12.5C18 12.95 17.9333 13.375 17.8 13.775C17.6667 14.175 17.5 14.55 17.3 14.9L20.5 18.1L19.1 19.5ZM13.5 15C14.2 15 14.7917 14.7583 15.275 14.275C15.7583 13.7917 16 13.2 16 12.5C16 11.8 15.7583 11.2083 15.275 10.725C14.7917 10.2417 14.2 10 13.5 10C12.8 10 12.2083 10.2417 11.725 10.725C11.2417 11.2083 11 11.8 11 12.5C11 13.2 11.2417 13.7917 11.725 14.275C12.2083 14.7583 12.8 15 13.5 15Z" />
        </svg>
      </>
    ),
  },
];

const MyChatbotResourceContainer: React.FCC = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col">
      <NavigationMenu bordered>
        {links.map((link) => (
          <NavigationItem
            className={'flex-1 lg:flex-none'}
            link={{ ...link, path: link.path(String(router.query.slug)) }}
            key={link.path(String(router.query.slug))}
            icon={link.icon}
            shallow={true}
          />
        ))}
      </NavigationMenu>

      <div
        className={`mt-4 flex h-full flex-col space-y-4 lg:mt-6 lg:flex-row lg:space-x-8 lg:space-y-0`}
      >
        {children}
      </div>
    </div>
  );
};

export default MyChatbotResourceContainer;
