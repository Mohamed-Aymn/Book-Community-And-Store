import Button from "../components/atoms/Button";
import { useState } from "react";
import mainPhoto from "../assets/mainPhoto.jpg";
import secondaryPhoto from "../assets/secondaryPhoto.jpg";
import * as styles from "../styles/index";
import * as feedbackStyles from "../components/organisms/CustomersFeedback/styles";
import Logo from "../assets/Logo";
import P from "../components/atoms/Paragraph";
import Accordion, {
    AccordionContainer,
} from "../components/molecules/Accordion";
import CustomersFeedback from "../components/organisms/CustomersFeedback";
import { useInView } from "react-intersection-observer";
import { FadeAndTranslateScrollAnimation } from "../components/atoms/ScrollAnimation";
import useBookStore from "../client_state/useBookStore";
// import { layoutStore } from "../client_state/useLayoutStore";
// import { usebookStore } from "../client_state/useBookStore";

export default function Home() {
    let [highlightedImage, setHighlightedImage] = useState(mainPhoto);
    let reviewersNames = [
        "Auston Nichola",
        "Agatha Christie",
        "Houston Rickie",
    ];
    const { ref: HeroSectionRef, inView: HeroSectionInView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    // const setSearchQuery = bookStore((state: any) => state.setSearchQuery);
    const { setSearchQuery } = useBookStore();

    return (
        <>
            {/* hero section */}
            <styles.HeroSection ref={HeroSectionRef} inView={HeroSectionInView}>
                <styles.UpperHeroSectionPart>
                    <Logo display="big" />
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
                <styles.HeroSectionImageContainer>
                    <styles.StyledMainImage
                        src={mainPhoto}
                        alt="Main photo"
                        layout="fill"
                    />
                </styles.HeroSectionImageContainer>
            </styles.HeroSection>

            <main>
                {/* section one */}
                <styles.Section>
                    <FadeAndTranslateScrollAnimation
                        translateValue={5}
                        direction="top"
                        as={styles.SectionHeading}
                    >
                        <h1>
                            Highlight the key benefits of using your product
                        </h1>
                        <P>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Porro accusantium in laboriosam,
                        </P>
                    </FadeAndTranslateScrollAnimation>

                    <styles.KeyBenefitsSection>
                        <FadeAndTranslateScrollAnimation
                            translateValue={5}
                            direction="left"
                            as={styles.KeyBenefitsButtonsContainer}
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
                        </FadeAndTranslateScrollAnimation>
                        <FadeAndTranslateScrollAnimation
                            translateValue={5}
                            direction="right"
                            as={styles.ImageContainer}
                        >
                            <styles.StyledBenefitsImage
                                src={highlightedImage}
                                alt="benefits"
                                layout={"fill"}
                            />
                        </FadeAndTranslateScrollAnimation>
                    </styles.KeyBenefitsSection>
                </styles.Section>

                <styles.Section>
                    <FadeAndTranslateScrollAnimation
                        translateValue={5}
                        direction="top"
                        as={styles.SectionHeading}
                    >
                        <h1>Frequently asked questions</h1>
                        <P>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Porro accusantium in laboriosam,
                        </P>
                    </FadeAndTranslateScrollAnimation>
                    <styles.AccordionContainer>
                        <FadeAndTranslateScrollAnimation
                            translateValue={5}
                            as={AccordionContainer}
                        >
                            <Accordion title="Question One">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Similique perferendis quisquam
                                reprehenderit blanditiis, ullam corporis.
                            </Accordion>
                            <Accordion title="Question Two">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Similique perferendis quisquam
                                reprehenderit blanditiis, ullam corporis.
                            </Accordion>
                            <Accordion title="Question Three">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Similique perferendis quisquam
                                reprehenderit blanditiis, ullam corporis.
                            </Accordion>
                            <Accordion title="Question Four">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Similique perferendis quisquam
                                reprehenderit blanditiis, ullam corporis.
                            </Accordion>
                            <Accordion title="Question Five">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Similique perferendis quisquam
                                reprehenderit blanditiis, ullam corporis.
                            </Accordion>
                        </FadeAndTranslateScrollAnimation>
                    </styles.AccordionContainer>
                </styles.Section>

                <styles.Section>
                    <FadeAndTranslateScrollAnimation
                        translateValue={5}
                        direction="top"
                        as={styles.SectionHeading}
                    >
                        <h1>Customer testimonials</h1>
                    </FadeAndTranslateScrollAnimation>
                    <div style={{ overflow: "hidden" }}>
                        <feedbackStyles.CustomerFeedbackContainer>
                            {reviewersNames.map(
                                (reviewer: string, i: number) => {
                                    return (
                                        <CustomersFeedback
                                            key={i}
                                            img={mainPhoto}
                                            name={reviewer}
                                        />
                                    );
                                }
                            )}
                            {reviewersNames.map(
                                (reviewer: string, i: number) => {
                                    return (
                                        <CustomersFeedback
                                            key={i}
                                            img={mainPhoto}
                                            name={reviewer}
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
