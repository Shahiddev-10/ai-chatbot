import { Trans } from 'next-i18next';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import { chabotModalOptions } from '~/lib/chatbot/constants';

const ModelSelector: React.FCC<{
  value?: string;
  onChange?: (alignment: any) => unknown;
}> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onValueChange={(value: string) => {
        onChange && onChange(value);
      }}
      defaultValue={value}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {chabotModalOptions.map((option) => {
          return (
            <SelectItem
              key={option.value.toString()}
              value={option.value.toString()}
            >
              <span className={'text-sm'}>
                <Trans i18nKey={option.label} default={option.label} />
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ModelSelector;
