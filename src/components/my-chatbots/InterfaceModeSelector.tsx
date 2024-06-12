import { Trans } from 'next-i18next';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import { modes } from '~/lib/chatbot/constants';

const InterfaceModeSelector: React.FCC<{
  value?: string;
  onChange?: (mode: any) => unknown;
}> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onValueChange={(value: string) => {
        onChange && onChange(value);
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {modes.map((mode) => {
          return (
            <SelectItem
              key={mode.value.toString()}
              value={mode.value.toString()}
            >
              <span className={'text-sm'}>
                <Trans i18nKey={mode.label} default={mode.label} />
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default InterfaceModeSelector;
