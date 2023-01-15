import LargeNavMenu from "./LargeNavMenu";
import MobileNavMenu from "./MobileNavMenu";
import { useState, useEffect } from "react";
import { screens } from "../../../styles/mediaQuery";

export const NavMenu = ({ session }: any) => {
    const [isLargeScreen, setLargeScreen] = useState(
        window.innerWidth > screens.largeTablet
    );

    const updateMedia = () => {
        setLargeScreen(window.innerWidth > screens.largeTablet);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <>
            {isLargeScreen ? (
                <LargeNavMenu session={session} />
            ) : (
                <MobileNavMenu session={session} />
            )}
        </>
    );
};

export default NavMenu;
