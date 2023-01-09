import Button from "../components/molecules/Button";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "../styles/ThemeConfig";

export default {
    title: "Button",
    component: Button,
};

const Template: any = (args: any) => (
    <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Button {...args}>{args.children} </Button>
    </ThemeProvider>
);

export const Buttons = Template.bind({});
Buttons.args = {
    text: "Test",
    approach: "primary",
    icon: AiFillLike,
};

// export const secondary = Template.bind({});
// secondary.args = {
//     children: "Secondary",
//     approach: "secondary",
// };

// export const Danger = Template.bind({});
// Danger.args = {
//     children: "Danger",
//     approach: "danger",
// };

// export const catchy = Template.bind({});
// catchy.args = {
//     children: "Catchy",
//     approach: "catchy",
// };

// export const tag = Template.bind({});
// tag.args = {
//     children: "Tag",
//     approach: "tag",
// };

// // export const Loading = Template.bind({});
// // Loading.args = {
// //     text: "Loading...",
// //     type: "primary",
// //     isloading: true,
// // };

// // export const iconWithText = Template.bind({});
// // iconWithText.args = {
// //     text: "99",
// //     type: "primary",
// //     Icon: AiFillLike,
// // };

// // export const icon = Template.bind({});
// // icon.args = {
// //     type: "primary",
// //     Icon: MdOutlineNavigateNext,
// // };
