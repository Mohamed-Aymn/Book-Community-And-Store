import Image from "next/image";
import mainPhoto from "../../../assets/mainPhoto.jpg";
import { BiMenu } from "react-icons/bi";
import { HamburgerButton } from "./styles";
import styled from "styled-components";
import { mediaQueryMax } from "../../../styles/mediaQuery";

interface ISignedInNavAuthButtons {
    session: any;
    openNavbar: () => void;
}
const AuthImage = styled.div`
    cursor: pointer;
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
`;

export const SignedInNavAuthButtons = ({
    session,
    openNavbar,
}: ISignedInNavAuthButtons) => {
    let photo;
    if (!session?.user?.image) {
        photo = mainPhoto;
    } else {
        photo = session.user?.image;
    }
    return (
        <>
            <HamburgerButton onClick={openNavbar}>
                <BiMenu fill="#FFF" />
            </HamburgerButton>
            <AuthImage onClick={openNavbar}>
                <Image
                    src={photo}
                    alt="user Photo"
                    width={35}
                    height={35}
                    style={{
                        borderRadius: "2em",
                        border: "0.1em solid #69768b",
                    }}
                />
            </AuthImage>
        </>
    );
};
