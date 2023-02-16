import styled from "styled-components";
import { layoutStore } from "../../clientState/layoutStore";
import Logo from "../../assets/Logo";
import { mediaQueryMax, screens } from "../../styles/mediaQuery";
import { useEffect, useState } from "react";

const Container = styled.footer`
    position: sticky;
    top: 100%;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    margin-top: 7em;
    padding: 1em 7em 0 7em;
    padding-top: 1em;
    border-top: solid 0.01em ${(props) => props.theme.neutral3};
`;
const LeftSmallFooterButton = styled.button`
    background-color: transparent;
    font-size: 0.8rem;
    color: ${(props) => props.theme.neutral1};
    border: none;
    outline: none;
    text-align: left;
`;
const RightSmallFooterButton = styled.button`
    background-color: transparent;
    font-size: 0.8rem;
    color: ${(props) => props.theme.neutral1};
    border: none;
    outline: none;
    text-align: right;
`;
const ColTitle = styled.div`
    font-weight: bold;
`;
const FooterRoute = styled.div`
    font-size: 0.9rem;
`;
const UpperContent = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr repeat(5, 1fr);
    gap: 2em;
    grid-template-areas: "logo getToKnowUs shopWithUs letUsHelpYou social text";
    ${mediaQueryMax("desktop")`
        grid-template-columns: 1fr repeat(5, 1fr);
        grid-template-areas: 
            "logo getToKnowUs shopWithUs letUsHelpYou social text";
        gap: 1em;
    `};
    ${mediaQueryMax("smallDesktop")`
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-template-areas: 
            "logo text"
            "getToKnowUs shopWithUs"
            "letUsHelpYou social";
        gap: 1em;
    `};
`;
const LowerContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1em 0;
`;
const LastCol = styled.div`
    text-align: right;
    hyphens: manual;
`;

export default function Footer() {
    const theme = layoutStore((state: any) => state.theme);
    const [isDesktopScreen, setDesktopScreen] = useState(true);
    const updateMedia = () => {
        setDesktopScreen(window.innerWidth < screens.desktop);
    };
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <Container>
            {/* upper div */}
            <UpperContent>
                <span style={{ gridArea: "logo" }}>
                    <Logo display={isDesktopScreen ? "small" : "default"} />
                </span>
                <div style={{ gridArea: "getToKnowUs" }}>
                    <ColTitle>Get to Know Us</ColTitle>
                    <FooterRoute>About Us</FooterRoute>
                    <FooterRoute>Join our team</FooterRoute>
                </div>
                <div style={{ gridArea: "shopWithUs" }}>
                    <ColTitle>Shop with Us</ColTitle>
                    <FooterRoute>Your Account</FooterRoute>
                    <FooterRoute>Your Orders</FooterRoute>
                </div>
                <div style={{ gridArea: "letUsHelpYou" }}>
                    <ColTitle>Let Us Help You</ColTitle>
                    <FooterRoute>Help</FooterRoute>
                    <FooterRoute>Shipping & Delivery</FooterRoute>
                </div>
                <div style={{ gridArea: "social" }}>
                    <ColTitle>Social</ColTitle>
                    <FooterRoute>Facebook</FooterRoute>
                    <FooterRoute>Instgram</FooterRoute>
                    <FooterRoute>Twitter</FooterRoute>
                </div>
                <LastCol style={{ gridArea: "text" }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Aspernatu.
                </LastCol>
            </UpperContent>

            {/* lover idv */}
            <LowerContent>
                <div>
                    <LeftSmallFooterButton>
                        All rights reserved
                    </LeftSmallFooterButton>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "left",
                        flexDirection: "column",
                    }}
                >
                    <RightSmallFooterButton>
                        Privacy Policy
                    </RightSmallFooterButton>
                    <RightSmallFooterButton>
                        Terms & Conditions
                    </RightSmallFooterButton>
                </div>
            </LowerContent>
        </Container>
    );
}
