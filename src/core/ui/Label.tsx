import { createElement } from 'react';
import classNames from 'classnames';

type Props = React.LabelHTMLAttributes<unknown> & {
  as?: string;
};

const Label: React.FCC<Props> = ({ children, className, as, ...props }) => {
  const tag = as ?? `label`;

  return createElement(
    tag,
    {
      className: classNames(
        `w-full relative text-sm text-white dark:text-white [&>*]:mt-[0.35rem] font-Outfit text-xl`,
        className
      ),
      ...props,
    },
    children
  );
};

export default Label;
