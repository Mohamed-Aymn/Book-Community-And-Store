import LargeNavMenu from "./LargeNavMenu";
import MobileNavMenu from "./MobileNavMenu";

export const NavMenu = ({ session }: any) => {
    return (
        <>
            <MobileNavMenu session={session} />
            <LargeNavMenu session={session} />
        </>
    );
};

export default NavMenu;
