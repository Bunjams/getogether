import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "components/Design/Button/Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(() => {}),
    size: "middle",
    block: true,
    children: "Button",
    shape: "round",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
  },
};

export const Default: Story = {
  args: {
    type: "default",
  },
};

export const Dashed: Story = {
  args: {
    type: "dashed",
  },
};

export const Link: Story = {
  args: {
    type: "link",
  },
};

export const Text: Story = {
  args: {
    type: "text",
  },
};
