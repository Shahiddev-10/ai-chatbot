import { forwardRef, useCallback } from 'react';
import classNames from 'classnames';

const Textarea = forwardRef<
  React.ElementRef<'textarea'>,
  React.TextareaHTMLAttributes<unknown> & {
    autoResize?: boolean;
  }
>(function TextareaComponent({ className, ...props }, ref) {
  const onInput = useAutoResize(props.onInput);

  return (
    <textarea
      ref={ref}
      {...props}
      onInput={props.autoResize ? onInput : props.onInput}
      className={classNames(
        ` w-full flex-1 border-b-2 border-white bg-transparent py-1 pr-3 font-Outfit outline-none placeholder:text-white/[0.6] disabled:cursor-not-allowed  disabled:opacity-30 focus:!border-gray_bg-2 focus:shadow-field-shadow active:!border-gray_bg-2 active:shadow-field-shadow px-5`,
        className,
        {
          [`cursor-not-allowed bg-gray-100 hover:bg-gray-100 dark:bg-black-400 `]:
            props.disabled,
        }
      )}
    />
  );
});

export default Textarea;

function useAutoResize(onInput?: React.FormEventHandler<HTMLTextAreaElement>) {
  const callback: React.FormEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const target = event.currentTarget;

      target.style.height = '';
      target.style.height = target.scrollHeight + 'px';

      if (onInput) {
        onInput(event);
      }
    },
    [onInput]
  );

  return callback;
}
