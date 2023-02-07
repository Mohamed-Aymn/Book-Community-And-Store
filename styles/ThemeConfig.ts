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
    neutral1: "var(--grey-neutral-color)",
    neutral2: "var(--light-neutral-color)",
    neutral3: "var(--lightest-neutral-color)",
};

export const darkTheme: ITheme = {
    body: "var(--black-color)",
    text: "var(--white-color)",
    neutral1: "var(--grey-neutral-color)",
    neutral2: "var(--dark-neutral-color)",
    neutral3: "var(--darkest-neutral-color)",
};

export const GlobalStyles = createGlobalStyle`
:root {
    // ------------------------------------- colors
    --primary-color: #4a81f0;

    // secondary  
    --white-color: #fff; /* dark theme */
    --black-color: #000; /* light theme */

    // neutrals 
    --darkest-neutral-color: #181818;
    --dark-neutral-color: #5c5c5c;
    --grey-neutral-color: #9e9e9e;
    --light-neutral-color: #e0e0e0; 
    --lightest-neutral-color: #e5e5e5;

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
body {
    background: ${({ theme }: { theme: ITheme }) => theme.body};
    transition: all 0.50s linear;
    /* color: ${({ theme }) => theme.text}; */
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
    padding-top: 4em;
    // 5em navbar height, 10em footer height, 1,7 footer margin
    min-height: calc(100vh - (5em + 10em) + 1.7em + 1.7em);
    ${mediaQueryMax("desktop")`
        margin: 0 1.7em;
    `}
}
`;

// --------------------------------------------------- new (add this to ui docs)
/*
Rules:-
------

- grey scale color system is used to enhance editeing processin the furture
- spacing rules
    - for layout containers spaces => md
    - inline content spacing => sm
    - heaidng spacings => sm
    - section spacing => xxs
    - tiny spacing needed for margins
*/

// --------------------------------------------------- old
/*
:root {
    // ------------------------------------- colors
    // main
    --primary-color: #a0edb2;
    --secondary-color: #0f1219;

    // neutrals 
    --neutral-white-color: #fff;
    --neutral-light-grey-color: #6a7587;  
    --neutral-dark-grey-color: #96a4b9;  
    --neutral-darkest-blue-color: #0f1219;  
    --neutral-dark-blue-color: #1a1f28;
    --neutral-light-blue-color: #edf3f9;  
    --neutral-new: #f3f5f7;

    --Trial: #e8ebf2;

    // interactions 
    --success-interaction-color: #386f5e; 
    --danger-interaction-color: #b95573;  

    // ------------------------------------- spacings

}


Rule:-
-----

10% of the design should be your core brand color.
30% of the design should be your secondary brand color.
60% of your design should be a neutral color.

ref: https://venngage.com/blog/brand-colors/#:~:text=10%25%20of%20the%20design%20should,should%20be%20a%20neutral%20color


// primary 
color: #a0edb2;

// secondary 
color: #0f1219;

// neutral colors 
color: #fff;    // white 
color: #0f1219; // darkest blue 
color: #f4f8fb; // light blue 
color: #2d3341; // dark grey 
color: #1a1f28; // dark blue 

// interactions 
color: #386f5e;  // success 
color: #b95573;    // failer or danger 




// ----------------------- map

*                   light           dark
body                #fff            #0f1219
neutral1            #0f1219         #2d3341
neutral2            #f4f8fb         #1a1f28
neutral3                    #6a7587 

*/

// --------------------------------------------------- OLD

/*

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
*/

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
