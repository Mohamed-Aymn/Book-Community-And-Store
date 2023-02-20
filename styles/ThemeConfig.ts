import { createGlobalStyle, DefaultTheme } from "styled-components";
import { mediaQueryMax } from "./mediaQuery";

// all used colors
// primary color
const Primary = "#4a81f0";

// secondary colors
const White = "#fff";
const Black = "#000";

// neutrals colors
const DarkestNeutralColor = "#222222";
const DarkNeutralColor = "#303030";
const GreyNeutralColor = "#8f8f8f";
const LightNeutralColor = "#e5e5e5";
const LightestNeutralColor = "#eeeeee";

// interactivity colors
const SuccessInteractionColor = "#386f5e";
const DangerInteractionColor = "#b95573";

const SpaceUnit = 1;

const defaults = {
    // breakpoints: [
    //     "1920 px",
    //     "1280 px",
    //     "1024 px",
    //     "768 px",
    //     "480 px",
    //     "360 px",
    //     "320 px",
    // ],
    space: {
        xs: `${SpaceUnit * 0.5}em`,
        sm: `${SpaceUnit}em`,
        md: `${SpaceUnit * 2}em`,
        lg: `${SpaceUnit * 4}em`,
        xl: `${SpaceUnit * 8}em`,
    },
};

const defaultColors = {
    primary: Primary,
    success: SuccessInteractionColor,
    danger: DangerInteractionColor,
};

export const lightTheme: DefaultTheme = {
    ...defaults,
    colors: {
        ...defaultColors,
        body: White,
        text: Black,
        neutral1: LightestNeutralColor,
        neutral2: LightNeutralColor,
        neutral3: GreyNeutralColor,
    },
};

export const darkTheme: DefaultTheme = {
    ...defaults,
    colors: {
        ...defaultColors,
        body: Black,
        text: White,
        neutral1: DarkestNeutralColor,
        neutral2: DarkNeutralColor,
        neutral3: GreyNeutralColor,
    },
};

export const GlobalStyles = createGlobalStyle`
:root {
    // ------------------------------------- colors
    --primary-color: #4a81f0;

    // secondary  
    --white-color: #fff; /* dark theme */
    --black-color: #000; /* light theme */

    // neutrals 
    --darkest-neutral-color: #222222;
    --dark-neutral-color: #303030;
    --grey-neutral-color: #8f8f8f;
    --light-neutral-color: #e5e5e5; 
    --lightest-neutral-color: #eeeeee;

    // interactivity
    --success-interaction-color: #386f5e; 
    --danger-interaction-color: #b95573; 


    // ------------------------------------- spacings
    --space-unit: 1em;
    --space-xxs:  calc(0.25 * var(--space-unit));
    --space-xs:   calc(0.5 * var(--space-unit));
    --space-sm:   calc(0.75 * var(--space-unit));
    --space-md:   calc(1.25 * var(--space-unit));
    --space-lg:   calc(2 * var(--space-unit));
    --space-xl:   calc(3.25 * var(--space-unit));
    --space-xxl:  calc(5.25 * var(--space-unit));

}
html{
    height: 100%;
    width: 100%;
    margin: 0;
    margin: 0;
    padding: 0;
}
body {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.body};
    transition: all 0.50s linear;
    color: ${({ theme }) => theme.colors.text};
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100vw;
    height: 100%;
    /* background-color: red; */
}
*{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
h1,h2,h3,h4,h5,h6{
    color: ${({ theme }) => theme.colors.text};
    margin: var(--space-sm) 0;
    padding: 0;
}
main {
    max-width: 140ch;
    margin: 0 auto;
    padding-top: 5em;
    // 5em navbar height, 10em footer height, 1,7 footer margin
    min-height: calc(100vh - (5em + 10em) + 1.7em + 1.7em);
    ${mediaQueryMax("desktop")`
        margin: 0 1.7em;
    `}
}
`;
