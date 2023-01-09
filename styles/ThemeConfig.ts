import { createGlobalStyle } from "styled-components";

interface ITheme {
    body: string;
    primaryText: string;
    secondaryText: string;
    primary: string;
    secondary: string;
    tertiary: string;
}

export const lightTheme: ITheme = {
    body: "var(--white)",
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
}
h1,h2,h3,h4,h5,h6{
    color: ${({ theme }) => theme.primaryText};
}`;
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
