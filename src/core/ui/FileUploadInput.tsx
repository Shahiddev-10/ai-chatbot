import type { FormEvent, MouseEventHandler } from 'react';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Label from '~/core/ui/Label';
import If from '~/core/ui/If';
import IconButton from '~/core/ui/IconButton';

type Props = Omit<React.InputHTMLAttributes<unknown>, 'value'> & {
  file?: string | null;
  onClear?: () => void;
};

const FileUploadInput = forwardRef<React.ElementRef<'input'>, Props>(
  function FileUploadInputComponent(
    { children, file, onClear, onInput, ...props },
    forwardedRef
  ) {
    const localRef = useRef<HTMLInputElement>();

    const [state, setState] = useState({
      file,
      fileName: '',
    });

    const onInputChange = useCallback(
      (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.currentTarget.files;

        if (files?.length) {
          const file = files[0];
          const data = URL.createObjectURL(file);

          setState({
            file: data,
            fileName: file.name,
          });
        }

        if (onInput) {
          onInput(e);
        }
      },
      [onInput]
    );

    const fileRemoved: MouseEventHandler = useCallback(
      (e) => {
        e.preventDefault();

        setState({
          file: '',
          fileName: '',
        });

        if (localRef.current) {
          localRef.current.value = '';
        }

        if (onClear) {
          onClear();
        }
      },
      [onClear]
    );

    const setRef = useCallback(
      (input: HTMLInputElement) => {
        localRef.current = input;

        if (typeof forwardedRef === 'function') {
          forwardedRef(localRef.current);
        }
      },
      [forwardedRef]
    );

    useEffect(() => {
      setState((state) => ({ ...state, file }));
    }, [file]);

    return (
      <label
        id={'file-upload-input'}
        tabIndex={0}
        className={`
        relative flex h-10 cursor-pointer rounded-md border border-dashed border-gray-200 bg-white px-3 py-2 outline-none ring-offset-1 transition-all hover:bg-gray-50 focus:ring-2
        focus:ring-primary-200 dark:border-black-200 dark:bg-black-400 dark:hover:border-black-100 dark:focus:ring-primary-500/70 dark:focus:ring-offset-black-400`}
      >
        <input
          {...props}
          ref={setRef}
          className={'hidden'}
          type={'file'}
          onInput={onInputChange}
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-labelledby={'file-upload-input'}
        />

        <div className={'flex items-center space-x-4'}>
          <div className={'flex'}>
            <CloudArrowUpIcon
              className={'h-5 text-gray-500 dark:text-black-100'}
            />
          </div>

          <If condition={!state.file}>
            <div className={'flex flex-auto'}>
              <Label as={'span'} className={'cursor-pointer text-xs'}>
                {children}
              </Label>
            </div>
          </If>

          <If condition={state.file as string}>
            <div className={'flex flex-auto'}>
              <If
                condition={state.fileName}
                fallback={
                  <Label
                    as={'span'}
                    className={'cursor-pointer truncate text-xs'}
                  >
                    {children}
                  </Label>
                }
              >
                <Label as="span" className={'truncate text-xs'}>
                  {state.fileName}
                </Label>
              </If>
            </div>
          </If>

          <If condition={state.file}>
            <IconButton className={'!h-5 !w-5'} onClick={fileRemoved}>
              <XMarkIcon className="h-4" />
            </IconButton>
          </If>
        </div>
      </label>
    );
  }
);
export default FileUploadInput;
