import style from "./footer.module.scss";
import { BsGithub } from "react-icons/bs";
import styled from "styled-components";

const Footer = styled.footer`
    position: sticky;
    top: 100%;
    color: var(--neutral-dark-grey-color);
    background-color: var(--secondary-color);
    /* border-radius: 0.7em; */
    height: 10em;
    margin-top: 1.7em;
    padding: 3em 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    border-top: solid 0.05em ${(props) => props.theme.neutral3};
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
