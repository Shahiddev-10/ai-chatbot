import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Transition } from '@headlessui/react';

import Label from './Label';
import If from '~/core/ui/If';

type Props = React.InputHTMLAttributes<unknown> & { withIcon?: boolean };

const Hint: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span
      className={`block pl-1 text-xs
        font-normal leading-tight text-gray-500 dark:text-gray-400`}
    >
      {children}
    </span>
  );
};

const Input = forwardRef<React.ElementRef<'input'>, Props>(
  function TextFieldInputComponent(
    { className, children, withIcon = false, ...props },
    ref
  ) {
    return (
      <div
        className={classNames(
          `relative flex w-full  items-center border-white  px-10 pr-0 pl-0 font-Outfit font-normal text-white   transition-all placeholder:text-gray_text-2 lg:text-lg group`,
          className,
          {
            [`cursor-not-allowed`]: props.disabled,
          }
        )}
      >
        <If condition={children}>
          <span className={'flex pl-2.5'}>{children}</span>
        </If>

        <input
          {...props}
          className={classNames(
            ` flex-1 bg-transparent ${withIcon ? '!px-10 pr-9' : ''
            } px-5 w-full  pr-3 outline-none placeholder:text-white/[0.6] disabled:cursor-not-allowed disabled:opacity-30 md:text-sm lg:text-lg h-[60px] rounded-lg !border  !border-gray_bg-1 !bg-transparent  py-1 placeholder:text-gray_text-0 focus:!border-gray_bg-2 focus:shadow-field-shadow active:!border-gray_bg-2 active:shadow-field-shadow `
            // className
          )}
          ref={ref}
        />
      </div>
    );
  }
);

type TextFieldComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> & {
  Label: typeof Label;
  Hint: typeof Hint;
  Input: typeof Input;
  Error: typeof ErrorMessage;
};

const TextField: TextFieldComponent = ({ children, className }) => {
  return (
    <div
      className={classNames(`relative mt-0 flex flex-col space-y-1	1xs:mb-4 sm:mb-4 md:md-4 lg:md-0`, className)}
    >
      {children}
    </div>
  );
};

const ErrorMessage: React.FC<
  { error: Maybe<string> } & React.HTMLAttributes<unknown>
> = ({ error, ...props }) => {
  const shouldDisplay = !!error;

  return (
    <Transition
      show={shouldDisplay}
      appear={shouldDisplay}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-50"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Hint>
        <span {...props} className={'py-0.5 text-red-700'}>
          {error}
        </span>
      </Hint>
    </Transition>
  );
};

TextField.Hint = Hint;
TextField.Label = Label;
TextField.Input = Input;
TextField.Error = ErrorMessage;

export default TextField;
