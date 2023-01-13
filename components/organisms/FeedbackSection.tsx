import styled from "styled-components";
import mainPhoto from "../../assets/mainPhoto.jpg";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import Button from "../../components/atoms/Button";
import Link from "next/link";
import { mediaQueryMax } from "../../styles/mediaQuery";

const FeedbackCardsContainer = styled.section`
    display: flex;
    gap: 1.7em;
    ${mediaQueryMax("largeTablet")`
        flex-wrap: wrap;
    `}
`;

export default function () {
    return (
        <section>
            <h1>Our Customers</h1>
            <div>
                <FeedbackCardsContainer>
                    <CustomersFeedback img={mainPhoto} name="Auston Nichola" />
                    <CustomersFeedback img={mainPhoto} name="Agatha Christie" />
                    <CustomersFeedback img={mainPhoto} name="Houston Rickie" />
                </FeedbackCardsContainer>
                <Link href="auth/signup" style={{ textDecoration: "none" }}>
                    <Button text="Join Us!" approach="catchy" size="big" />
                </Link>
            </div>
        </section>
    );
}
