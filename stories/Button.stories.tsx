import Button from "../components/molecules/Button";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

export default {
    title: "Button",
    component: Button,
};

const Template: any = (args: any) => <Button {...args} />;

export const primary = Template.bind({});
primary.args = {
    text: "Primary",
    type: "primary",
};

export const secondary = Template.bind({});
secondary.args = {
    text: "Secondary",
    type: "secondary",
};

export const Danger = Template.bind({});
Danger.args = {
    text: "Danger",
    type: "danger",
};

export const Loading = Template.bind({});
Loading.args = {
    text: "Loading...",
    type: "primary",
    isloading: true,
};

export const iconWithText = Template.bind({});
iconWithText.args = {
    text: "99",
    type: "primary",
    Icon: AiFillLike,
};

export const icon = Template.bind({});
icon.args = {
    type: "primary",
    Icon: MdOutlineNavigateNext,
};

export const catchy = Template.bind({});
catchy.args = {
    text: "Join Us!",
    type: "catchy",
};

export const tag = Template.bind({});
tag.args = {
    text: "scientific",
    type: "tag",
};
