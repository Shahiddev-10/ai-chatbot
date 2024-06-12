import React, { useEffect } from 'react';
import RouteShell from '~/components/RouteShell';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import { useRouter } from 'next/router';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import { useUserId } from '~/core/hooks/use-user-id';

const links = [
  {
    path: (id: string) => `/my-chatbots/${id}/analytics`,
    i18n: 'Analytics',
  },
  // {
  //   path: (id: string) => `/my-chatbots/${id}/embed`,
  //   i18n: 'Embed',
  // },
  {
    path: (id: string) => `/my-chatbots/${id}/customize`,
    i18n: 'Customize',
  },
];

const MyChatbotPageContainer: React.FCC = ({ children }) => {
  const router = useRouter();
  const { data: chatbot } = useCurrentChatbot(String(router.query.slug));
  const userId = useUserId();

  useEffect(() => {
    // to check if chatbots user id is same as logged in user id
    if (
      chatbot !== undefined &&
      userId !== undefined &&
      chatbot?.userId !== userId
    ) {
      router.push('/my-chatbots');
    }
  }, [chatbot]);

  return (
    <RouteShell title={chatbot?.name}>
      <NavigationMenu bordered>
        {links.map((link) => (
          <NavigationItem
            className={'flex-1 lg:flex-none'}
            link={{ ...link, path: link.path(String(router.query.slug)) }}
            key={link.path(String(router.query.slug))}
          />
        ))}
      </NavigationMenu>

      <div
        className={`mt-4 flex h-full flex-col space-y-4 lg:mt-6 lg:flex-row lg:space-x-8 lg:space-y-0`}
      >
        {chatbot !== undefined &&
          userId !== undefined &&
          chatbot?.userId === userId &&
          children}
      </div>
    </RouteShell>
  );
};

export default MyChatbotPageContainer;
