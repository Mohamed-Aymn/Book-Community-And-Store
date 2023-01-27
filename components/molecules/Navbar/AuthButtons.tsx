import styled from "styled-components";
import { useSession } from "next-auth/react";
import { SignedInNavAuthButtons } from "./SignedInNavAuthButtons";
import { SignedOutNavAuthButtons } from "./SignedOutNavAuthButtons";
import { layoutStore } from "../../../clientState/layoutStore";
import NavMenu from "./NavMenu";

const AuthButtonsContainer = styled.div`
    /* width: 10em; */
    padding-left: 2em;
    display: flex;
    justify-content: flex-end;
`;

export const AuthButtons = () => {
    const { data: session } = useSession();
    const toggleNavbarMenu = layoutStore(
        (state: any) => state.toggleNavbarMenu
    );
    const isNavbarMenu = layoutStore((state: any) => state.isNavbarMenu);
    return (
        <AuthButtonsContainer>
            {session ? (
                <SignedInNavAuthButtons
                    session={session}
                    openNavbar={toggleNavbarMenu}
                />
            ) : (
                <SignedOutNavAuthButtons openNavbar={toggleNavbarMenu} />
            )}

            {isNavbarMenu && <NavMenu session={session} />}
        </AuthButtonsContainer>
    );
};

export default AuthButtons;
