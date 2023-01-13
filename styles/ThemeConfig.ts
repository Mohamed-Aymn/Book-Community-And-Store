import { createGlobalStyle } from "styled-components";
import { mediaQueryMax } from "./mediaQuery";

interface ITheme {
    body: string;
    primaryText: string;
    secondaryText: string;
    primary: string;
    secondary: string;
    tertiary: string;
}

export const lightTheme: ITheme = {
    body: "var(--white-color)",
    primaryText: "var(--dark-blue)",
    secondaryText: "var(--light-neutral-blue)",
    primary: "var(--dark-blue)",
    secondary: "var(--lightest-blue)",
    tertiary: "var(--light-neutral-blue)",
};

export const darkTheme: ITheme = {
    body: "var(--dark-blue)",
    primaryText: "var(--white)",
    secondaryText: "var(--dark-neutral-blue)",
    primary: "var(--lighter-blue)",
    secondary: "var(--light-blue)",
    tertiary: "var(--dark-neutral-blue)",
};

export const GlobalStyles = createGlobalStyle`
:root {
    // ---------------------- colors
    --dark-blue: #0f1219;
    --white-color: #fff;
    //
    --lightest-blue: #f3f5f7;
    --lighter-blue: #2d3341;
    --light-blue: #1a1f28;
    --dark-neutral-blue: #69768b;
    --light-neutral-blue: #717f94;	
    //  
    --repeler-color: #b95573;
    --attractor-color: #a2eeb2;
}
body {
    background: ${({ theme }: { theme: ITheme }) => theme.body};
    transition: all 0.50s linear;
    color: ${({ theme }) => theme.secondaryText};
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    /* font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */
    /* font-family: "Almarai", sans-serif; */
}
*{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
h1,h2,h3,h4,h5,h6{
    color: ${({ theme }) => theme.primaryText};
}
main {
    max-width: 140ch;
    margin: 0 auto;
    padding-top: 4.1em;
    // 5em navbar height, 10em footer height, 1,7 footer margin
    min-height: calc(100vh - (5em + 10em) + 1.7em);
    ${mediaQueryMax("desktop")`
        margin: 0 1.7em;
    `}
}
`;
/*
ref:
https://dribbble.com/shots/19262105-Nook-Members-Settings

*		        light			        dark

body		    white			        dark-blue
primarytext	    dark-blue		        white
secondaryText	light-neutral-blue  	dark-neutral-blue
primary		    dark-blue		        lighter-blue
secondary	    lightest-blue		    light-blue
tertiray 	    light-neutral-blue	    dark-neutral-blue


----------keys
white			    #FFF
dark-blue		    #0f1219
lightest-blue		#f3f5f7
light-blue		    #1a1f28
]lighter-blue		#2d3341
dark-neutral-blue	#69768b
light-neutral-blue	#717f94	

repeler-color 		#b95573    
attractor-color 	#a2eeb2
*/
