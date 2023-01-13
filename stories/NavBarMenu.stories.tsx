import { AiFillLike } from "react-icons/ai";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "../styles/ThemeConfig";

export default {
    title: "NavBarmenu",
    component: NavMenu,
};

const Template: any = (args: any) => (
    <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <NavMenu {...args}>{args.children} </NavMenu>
    </ThemeProvider>
);

export const nav = Template.bind({});
nav.args = {
    text: "Test",
    approach: "primary",
    icon: AiFillLike,
};
