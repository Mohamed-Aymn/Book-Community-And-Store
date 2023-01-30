import style from "./footer.module.scss";
import { BsGithub } from "react-icons/bs";
import styled from "styled-components";
import { layoutStore } from "../../clientState/layoutStore";
import { BiBookBookmark } from "react-icons/bi";
import Link from "next/link";

const Container = styled.footer`
    position: sticky;
    top: 100%;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    /* height: 20em; */
    margin-top: 7em;
    padding: 0 7em;

    /* padding: 3em 1.5em; */

    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em; */
`;

const SmallButton = styled.button`
    background-color: transparent;
    font-size: 0.8rem;
    color: ${(props) => props.theme.neutral1};
    border: none;
    outline: none;
`;

const ColTitle = styled.div`
    /* font-size: 1.1rem; */
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
`;

const LowerContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1em 0;
`;

const Title = styled.div`
    padding-top: 0.5em;
    font-size: 2rem;
    margin-left: -0.07em;
    font-weight: 800;
    color: ${(props) => props.theme.text};
    line-height: 1.5ch;
    div {
        font-weight: 800;
        font-size: 1.8rem;
        line-height: 1.6ch;
        color: transparent;
        -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: ${(props) => props.theme.text};
    }
    span {
        display: block;
    }
`;

export default function Footer() {
    const theme = layoutStore((state: any) => state.theme);

    return (
        <Container>
            {/* upper div */}
            <UpperContent>
                {/* logo and slogan */}
                <div>
                    <BiBookBookmark
                        fill={theme === "light" ? "#000" : "#fff"}
                        style={{
                            width: "2em",
                            height: "2em",
                        }}
                    />
                    <Title>
                        <div>Book</div>
                        Community <span>& Store</span>
                    </Title>
                </div>
                <div>
                    <ColTitle>Get to Know Us</ColTitle>
                    <FooterRoute>About Us</FooterRoute>
                    <FooterRoute>Join our team</FooterRoute>
                </div>
                <div>
                    <ColTitle>Shop with Us</ColTitle>
                    <FooterRoute>Your Account</FooterRoute>
                    <FooterRoute>Your Orders</FooterRoute>
                </div>
                <div>
                    <ColTitle>Let Us Help You</ColTitle>
                    <FooterRoute>Help</FooterRoute>
                    <FooterRoute>Shipping & Delivery</FooterRoute>
                </div>
                <div>
                    <ColTitle>Social</ColTitle>
                    <FooterRoute>Facebook</FooterRoute>
                    <FooterRoute>Instgram</FooterRoute>
                    <FooterRoute>Twitter</FooterRoute>
                </div>
                <div>
                    <ColTitle>Contact Us</ColTitle>
                    <FooterRoute> Lorem</FooterRoute>
                </div>
            </UpperContent>

            {/* lover idv */}
            <LowerContent>
                <div>
                    <SmallButton>All rights reserved</SmallButton>
                </div>
                <div>
                    <SmallButton>Privacy Policy</SmallButton>
                    <SmallButton>Terms & Conditions</SmallButton>
                </div>
            </LowerContent>
        </Container>
    );
}
