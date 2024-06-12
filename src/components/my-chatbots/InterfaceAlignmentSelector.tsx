import { Trans } from 'next-i18next';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import { alignments } from '~/lib/chatbot/constants';

const InterfaceAlignmentSelector: React.FCC<{
  value?: string;
  onChange?: (alignment: any) => unknown;
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
        {alignments.map((alignment) => {
          return (
            <SelectItem
              key={alignment.value.toString()}
              value={alignment.value.toString()}
            >
              <span className={'text-sm'}>
                <Trans i18nKey={alignment.label} default={alignment.label} />
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default InterfaceAlignmentSelector;
