const LEFT = {
  label: 'Left',
  description: 'Left align Chat Bubble',
  value: 'Left',
};
const RIGHT = {
  label: 'Right',
  description: 'Right align Chat Bubble',
  value: 'Right',
};

export const alignments = [LEFT, RIGHT];

const DARK = {
  label: 'Dark',
  description: 'Dark mode for Chat Bubble',
  value: 'Dark',
};
const LIGHT = {
  label: 'Light',
  description: 'Light mode for Chat Bubble',
  value: 'Light',
};

export const modes = [DARK, LIGHT];

const PUBLIC = {
  label: 'Public',
  description: 'Public Chat Bubble',
  value: 'Public',
};
const PRIVATE = {
  label: 'Private',
  description: 'Private Chat Bubble',
  value: 'Private',
};

export const visibility = [PUBLIC, PRIVATE];

export const chabotModalOptions = [
  {
    label: 'GPT-4 32k',
    description: '',
    value: 'GPT-4 32k',
  },
  {
    label: 'GPT-4',
    description: '',
    value: 'GPT-4',
  },
  {
    label: 'GPT-3.5 16k',
    description: '',
    value: 'GPT-3.5 16k',
  },
  {
    label: 'GPT-3.5',
    description: '',
    value: 'GPT-3.5',
  },
  {
    label: 'Davinci',
    description: '',
    value: 'Davinci',
  },
  {
    label: 'Curie',
    description: '',
    value: 'Curie',
  },
  {
    label: 'Babbage',
    description: '',
    value: 'Babbage',
  },
  {
    label: 'Ada',
    description: '',
    value: 'Ada',
  },
];
