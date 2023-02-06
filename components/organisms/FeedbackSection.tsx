import styled from "styled-components";
import mainPhoto from "../../assets/mainPhoto.jpg";
import CustomersFeedback from "../../stories/templates/Home/CustomersFeedback.stories";
import Button from "../../components/atoms/Button";
import Link from "next/link";
import { mediaQueryMax } from "../../styles/mediaQuery";

const FeedbackCardsContainer = styled.section`
    display: grid;
    gap: 1.7em;
    grid-template-columns: repeat(3, 1fr);
    ${mediaQueryMax("largeTablet")`
        grid-template-columns: repeat(1, 1fr);
    `}
`;

export default function FeedbackSection() {
    return (
        <section>
            <h1>Our Customers</h1>
            <div>
                <FeedbackCardsContainer>
                    <CustomersFeedback img={mainPhoto} name="Auston Nichola" />
                    <CustomersFeedback img={mainPhoto} name="Agatha Christie" />
                    <CustomersFeedback img={mainPhoto} name="Houston Rickie" />
                </FeedbackCardsContainer>
                <Link
                    href="auth/signup"
                    style={{
                        margin: "2em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "none",
                    }}
                >
                    <Button text="Join Us!" approach="primary" size="big" />
                </Link>
            </div>
        </section>
    );
}
