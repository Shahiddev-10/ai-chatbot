import { Trans } from 'next-i18next';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import { visibility } from '~/lib/chatbot/constants';

const VisibilitySelector: React.FCC<{
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
        {visibility.map((visible) => {
          return (
            <SelectItem
              key={visible.value.toString()}
              value={visible.value.toString()}
            >
              <span className={'text-sm'}>
                <Trans i18nKey={visible.label} default={visible.label} />
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default VisibilitySelector;
