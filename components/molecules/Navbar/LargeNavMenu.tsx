import { signOut } from "next-auth/react";
import styled from "styled-components";
import { mediaQueryMax } from "../../../styles/mediaQuery";
import Button from "../../atoms/Button";

const LargeNavMenu = styled.div`
    position: absolute;
    top: 5em;
    width: 15em;
    /* min-height: 5em; */
    box-shadow: 0px 0px 17px #02020252;
    background-color: ${(props) => props.theme.body};
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
`;

export default function ({ session }: any) {
    return (
        <LargeNavMenu>
            <Button approach="primary" text="View Profile" width="full" />
            <Button
                approach="secondary"
                text="Sign out"
                onClick={() => signOut()}
                width="full"
            />
        </LargeNavMenu>
    );
}
