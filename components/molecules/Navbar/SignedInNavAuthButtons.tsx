import Image from "next/image";
import mainPhoto from "../../../assets/mainPhoto.jpg";
import styled, { css, keyframes } from "styled-components";
import { screens } from "../../../styles/mediaQuery";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { layoutStore } from "../../../clientState/layoutStore";

const Container = styled.div`
    gap: var(--space-xxs);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const NavMenuRotationAnimation = keyframes`
    0%, 50%, 100% {
        transform: rotate(0);
    }
    16.6% {
        transform: rotate(45deg);
    }
    33.2% {
        transform: rotate(-45deg);
    }
`;

const AnimatedButton = styled(IoMdArrowDropdown)<{
    isHovering: boolean;
    isNavbarMenu: boolean;
}>`
    color: ${({ theme }) => theme.text};
    transition: all 200ms 0.5s ease-in-out;
    animation: ${({ isHovering, isNavbarMenu }) =>
        isHovering && !isNavbarMenu
            ? css`
                  ${NavMenuRotationAnimation} ease-in-out infinite forwards;
                  scale: 1.5;
                  animation-duration: 2s;
                  animation-delay: 0.5s;
              `
            : ""};
    ${({ isNavbarMenu }) =>
        isNavbarMenu &&
        `
                scale: 1.5;
                transform: rotate(180deg);
            `};
`;

const AuthImage = styled(Image)<{ isHovering: boolean; isNavbarMenu: boolean }>`
    border-radius: 2em;
    border: 0.1em solid #000;
    ${({ isHovering, isNavbarMenu }) =>
        (isHovering || isNavbarMenu) &&
        `
                scale: 1.1;
            `}
    transition: all 300ms 0.5s ease-in-out;
`;

export const SignedInNavAuthButtons = ({ session }: any) => {
    let [isHovering, setHovering] = useState(false);

    let photo;
    if (!session?.user?.image) {
        photo = mainPhoto;
    } else {
        photo = session.user?.image;
    }

    const openNavbarMenu = layoutStore((state: any) => state.openNavbarMenu);
    const closeNavbarMenu = layoutStore((state: any) => state.closeNavbarMenu);
    const isNavbarMenu = layoutStore((state: any) => state.isNavbarMenu);

    const [isLargeScreen, setLargeScreen] = useState(true);
    const updateMedia = () => {
        setLargeScreen(window.innerWidth > screens.largeTablet);
    };
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <Container
            onClick={
                isNavbarMenu ? () => closeNavbarMenu() : () => openNavbarMenu()
            }
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {isLargeScreen && (
                <AnimatedButton
                    isHovering={isHovering}
                    isNavbarMenu={isNavbarMenu}
                />
            )}
            <AuthImage
                src={photo}
                alt="user Photo"
                width={35}
                height={35}
                isHovering={isHovering}
                isNavbarMenu={isNavbarMenu}
            />
        </Container>
    );
};
