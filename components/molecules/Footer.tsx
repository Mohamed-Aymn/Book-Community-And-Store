import style from "./footer.module.scss";
import { BsGithub } from "react-icons/bs";
import styled from "styled-components";

const Footer = styled.footer`
    position: sticky;
    top: 100%;
    color: ${(props) => props.theme.secondaryText};
    background-color: ${(props) => props.theme.primary};
    border-radius: 0.7em;
    height: 10em;
    margin: 1.7em;
    padding: 3em 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;
const FooterText = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
export default function () {
    return (
        <Footer>
            <BsGithub />

            <FooterText>
                <div>Develped using * technologies</div>
                <div>
                    <div>copyRight reserverd</div>
                    <div>licensed with bla license</div>
                </div>
            </FooterText>
        </Footer>
    );
}
