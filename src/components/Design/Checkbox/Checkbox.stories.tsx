import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Checkbox from "./Checkbox";

const meta = {
  title: "Example/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(() => {}),
    children: "Checkbox",
    name: "checkbox",
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};
