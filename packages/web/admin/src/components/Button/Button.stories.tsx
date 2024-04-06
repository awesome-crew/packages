import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ButtonSize, ButtonType } from './types';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: Object.values(ButtonType),
    },
    size: {
      control: 'radio',
      options: Object.values(ButtonSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

//👇 Throws a type error it the args don't match the component props
export const LeftAddOn: Story = {
  args: {
    type: ButtonType.default,
    children: '편집',
    leftAddon: <Button.Icon name="PenLine" />,
  },
};
