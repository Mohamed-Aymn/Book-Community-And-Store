import Button from "../components/atoms/Button";
import { useState } from "react";
import mainPhoto from "../assets/mainPhoto.jpg";
import secondaryPhoto from "../assets/secondaryPhoto.jpg";
import * as styles from "../styles/homeStyles";
import * as feedbackStyles from "../styles/feedbackStyles";
import Logo from "../assets/Logo";
import P from "../components/atoms/Paragraph";
import Accordion from "../components/molecules/Accordion";
import CustomersFeedback from "./CustomersFeedback";

export default function Home() {
    let [highlightedImage, setHighlightedImage] = useState(mainPhoto);
    let reviewersNames = [
        "Auston Nichola",
        "Agatha Christie",
        "Houston Rickie",
    ];

    return (
        <>
            {/* hero section */}
            <styles.HeroSection>
                <styles.UpperHeroSectionPart>
                    <Logo />
                    <styles.UpperHeroSectionText>
                        <P>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aliquam neque laborum harum adipisci
                            perspiciatis eius natus saepe illum rerum ut! Non
                            odio et cumque, cupiditate suscipit illum in numquam
                            quaerat.
                        </P>
                        <Button approach="primary" text="Join Us!" />
                    </styles.UpperHeroSectionText>
                    {/* </div> */}
                </styles.UpperHeroSectionPart>
                <styles.ImageContainer>
                    <styles.StyledMainImage
                        src={mainPhoto}
                        alt="Main photo"
                        layout="fill"
                    />
                </styles.ImageContainer>
            </styles.HeroSection>

            <main>
                {/* section one */}
                <styles.Section>
                    <styles.SectionHeading>
                        <h1>
                            Highlight the key benefits of using your product
                        </h1>
                        <P>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Porro accusantium in laboriosam,
                        </P>
                    </styles.SectionHeading>
                    <styles.KeyBenefitsSection>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1em",
                            }}
                        >
                            <styles.HighlightBenefitButton
                                active={
                                    highlightedImage === mainPhoto
                                        ? true
                                        : false
                                }
                                onClick={() => setHighlightedImage(mainPhoto)}
                            >
                                <h2>Benefit one</h2>
                                <P>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Commodi, tenetur sed
                                    accusantium, autem aspernatur itaque
                                    blanditiis inventore non dolorum, fuga
                                    nostrum voluptatum! Temporibus ad molestiae
                                    at dignissimos iure facilis tempore?
                                </P>
                            </styles.HighlightBenefitButton>
                            <styles.HighlightBenefitButton
                                active={
                                    highlightedImage === secondaryPhoto
                                        ? true
                                        : false
                                }
                                onClick={() =>
                                    setHighlightedImage(secondaryPhoto)
                                }
                            >
                                <h2>Benefit two</h2>
                                <P>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Commodi, tenetur sed
                                    accusantium, autem aspernatur itaque
                                    blanditiis inventore non dolorum, fuga
                                    nostrum voluptatum! Temporibus ad molestiae
                                    at dignissimos iure facilis tempore?
                                </P>
                            </styles.HighlightBenefitButton>
                        </div>
                        <styles.ImageContainer>
                            <styles.StyledBenefitsImage
                                src={highlightedImage}
                                alt="benefits"
                                layout="fill"
                            />
                        </styles.ImageContainer>
                    </styles.KeyBenefitsSection>
                </styles.Section>

                <styles.Section>
                    <styles.SectionHeading>
                        <h1>Frequently asked questions</h1>
                        <P>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Porro accusantium in laboriosam,
                        </P>
                    </styles.SectionHeading>
                    <styles.AccordionContainer>
                        <Accordion title="Question One">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Similique perferendis quisquam reprehenderit
                            blanditiis, ullam corporis.
                        </Accordion>
                        <Accordion title="Question Two">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Similique perferendis quisquam reprehenderit
                            blanditiis, ullam corporis.
                        </Accordion>
                        <Accordion title="Question Three">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Similique perferendis quisquam reprehenderit
                            blanditiis, ullam corporis.
                        </Accordion>
                        <Accordion title="Question Four">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Similique perferendis quisquam reprehenderit
                            blanditiis, ullam corporis.
                        </Accordion>
                        <Accordion title="Question Five">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Similique perferendis quisquam reprehenderit
                            blanditiis, ullam corporis.
                        </Accordion>
                    </styles.AccordionContainer>
                </styles.Section>

                <styles.Section>
                    <styles.SectionHeading>
                        <h1>Customer testimonials</h1>
                    </styles.SectionHeading>
                    <div style={{ overflow: "hidden" }}>
                        <feedbackStyles.CustomerFeedbackContainer>
                            {reviewersNames.map(
                                (reviewer: string, i: number) => {
                                    return (
                                        <CustomersFeedback
                                            img={mainPhoto}
                                            name={reviewer}
                                            key={i}
                                        />
                                    );
                                }
                            )}
                            {reviewersNames.map(
                                (reviewer: string, i: number) => {
                                    return (
                                        <CustomersFeedback
                                            img={mainPhoto}
                                            name={reviewer}
                                            key={i}
                                        />
                                    );
                                }
                            )}
                        </feedbackStyles.CustomerFeedbackContainer>
                    </div>
                </styles.Section>
            </main>
        </>
    );
}
