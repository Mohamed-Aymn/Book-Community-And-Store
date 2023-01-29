import { signOut } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../atoms/Button";

const LargeNavMenu = styled.div`
    position: absolute;
    top: 5em;
    width: 15em;
    /* min-height: 5em; */
    box-shadow: 0px 0px 17px #02020252;
    background-color: ${(props) => props.theme.body};
`;

export default function ({ session }: any) {
    // TODO: profile route is not named after user email but user name, figure out a way to get user name form session, (problem with users that signed in whih credentials)
    return (
        <LargeNavMenu>
            <Link href={`/${session?.user._id}`}>
                <Button approach="primary" text="View Profile" width="full" />
            </Link>
            <Button
                approach="secondary"
                text="Sign out"
                onClick={() => signOut()}
                width="full"
            />
        </LargeNavMenu>
    );
}
