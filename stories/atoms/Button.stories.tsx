import Button from "../../components/atoms/Button";
import { ComponentStory, ComponentMeta, addParameters } from "@storybook/react";
import { GlobalStyles, lightTheme, darkTheme } from "../../styles/ThemeConfig";
import { WithThemeProvider } from "storybook-addon-styled-components-themes";

addParameters({
    styledComponentsThemes: {
        themes: [lightTheme, darkTheme],
        initialTheme: 0,
        label: ["light", "dark"],
    },
});

export default {
    title: "Design System/Atoms/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

export const Template: ComponentStory<typeof Button> = (args) => {
    return (
        <WithThemeProvider>
            <Button {...args} />
            <GlobalStyles />
        </WithThemeProvider>
    );
};

Template.args = {
    approach: "primary",
    text: "hello",
};
