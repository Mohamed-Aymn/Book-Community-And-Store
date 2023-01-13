export const mediaQueryMax = (key: keyof typeof screens) => {
    return (style: TemplateStringsArray | String) =>
        `@media (max-width: ${screens[key]}px) { ${style} }`;
};

export const mediaQueryMin = (key: keyof typeof screens) => {
    return (style: TemplateStringsArray | String) =>
        `@media (min-width: ${screens[key]}px) { ${style} }`;
};

export const screens = {
    wideDesktop: 1920,
    desktop: 1280,
    smallDesktop: 1024,
    largeTablet: 768,
    largeHandset: 480,
    mediumHandset: 360,
    smallHandset: 320,
};
