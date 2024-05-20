import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Input from "./Input";

const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(() => {}),
    name: "Input",
    placeholder: "Placeholder",
    disabled: true,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Middle: Story = {};

export const Small: Story = {
  args: {
    size: "small",
  },
};
