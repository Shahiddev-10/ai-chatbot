import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';

const links = [
  {
    path: '/my-chatbots/new',
    i18n: 'common:profileSettingsTabLabel',
  },
];
const MyChatbotsContentContainer: React.FCC = ({ children }) => {
  return (
    <>
      <NavigationMenu bordered>
        {links.map((link) => (
          <NavigationItem
            className={'flex-1 lg:flex-none'}
            link={link}
            key={link.path}
          />
        ))}
      </NavigationMenu>
      <div className={'w-full lg:max-w-4xl'}>{children}</div>
    </>
  );
};

export default MyChatbotsContentContainer;
