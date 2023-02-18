import { createGlobalStyle } from "styled-components";
import { mediaQueryMax } from "./mediaQuery";

interface ITheme {
    body: string;
    text: string;
    neutral1: string;
    neutral2: string;
    neutral3: string;
}

export const lightTheme: ITheme = {
    body: "var(--white-color)",
    text: "var(--black-color)",
    neutral1: "var(--lightest-neutral-color)",
    neutral2: "var(--light-neutral-color)",
    neutral3: "var(--grey-neutral-color)",
};

export const darkTheme: ITheme = {
    body: "var(--black-color)",
    text: "var(--white-color)",
    neutral1: "var(--darkest-neutral-color)",
    neutral2: "var(--dark-neutral-color)",
    neutral3: "var(--grey-neutral-color)",
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
    background: ${({ theme }: { theme: ITheme }) => theme.body};
    transition: all 0.50s linear;
    color: ${({ theme }) => theme.text};
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
    color: ${({ theme }) => theme.text};
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
