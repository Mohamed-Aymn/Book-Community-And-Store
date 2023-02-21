import Button from "../components/atoms/Button";
import { useState } from "react";
import mainPhoto from "../assets/mainPhoto.jpg";
import secondaryPhoto from "../assets/secondaryPhoto.jpg";
import * as feedbackStyles from "../components/organisms/CustomersFeedback/styles";
import Logo from "../assets/Logo";
import P from "../components/atoms/Paragraph";
import Accordion, {
    AccordionContainer,
} from "../components/molecules/Accordion";
import CustomersFeedback from "../components/organisms/CustomersFeedback";
import { useInView } from "react-intersection-observer";
import { FadeAndTranslateScrollAnimation } from "../components/atoms/ScrollAnimation";
import styled, { useTheme } from "styled-components";
import Box from "../components/atoms/Box";
import useMinScreenWidth from "../hooks/useScreenWidth";
import { screens } from "../styles/mediaQuery";
import ImageContainer from "../components/atoms/ImageContainer";
import Image from "next/image";
import Section from "../components/atoms/Section";

interface IHighlightBenefitButton {
    active: boolean;
}

export const KeyBenefitsButtonsContainer = styled.div<{ inView: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const SectionHeading = styled.div`
    text-align: center;
    margin-bottom: 2em;
`;

export const HighlightBenefitButton = styled.button<IHighlightBenefitButton>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: 300ms ease-in-out;
    &:hover {
        background-color: ${(props) => props.theme.colors.neutral2};
    }
    ${({ active, theme }) =>
        active
            ? `
        border-left: solid 0.2em ${theme.colors.text};
        background-color: ${theme.colors.neutral2};
        padding: 3em 1em;
        `
            : `
        border-left: solid 0.2em ${theme.colors.body};
        padding: 1em;
        `}
`;

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
    const theme = useTheme();
    const width = useMinScreenWidth();

    return (
        <>
            {/* hero section */}
            <Box
                ref={HeroSectionRef}
                // styles
                height="100vh"
                display="flex"
                flexGap={theme.space.md}
                flexDirection="column"
                pt="4.5em" // it's value is set according to nav height
                pb={theme.space.md}
                m={`0 ${theme.space.md}`}
                transition="300ms ease-in-out"
                opacity={HeroSectionInView ? "1" : "0"}
            >
                <Box
                    display="flex"
                    flexGap={theme.space.sm}
                    justifyContent="space-between"
                    flexDirection={
                        width < screens.largeTablet ? "column" : "row"
                    }
                >
                    <Logo display="big" />
                    <Box
                        display="flex"
                        flexGap={theme.space.sm}
                        flexDirection="column"
                        alignSelf="flex-end"
                        maxWidth={width < screens.largeTablet ? "100%" : "50%"}
                    >
                        <P>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aliquam neque laborum harum adipisci
                            perspiciatis eius natus saepe illum rerum ut! Non
                            odio et cumque, cupiditate suscipit illum in numquam
                            quaerat.
                        </P>
                        <Button approach="primary" text="Join Us!" />
                    </Box>
                </Box>
                <ImageContainer>
                    <Image
                        priority
                        src={mainPhoto}
                        alt="Main photo"
                        layout="fill"
                        objectFit="cover"
                        objectPosition={
                            width < screens.largeTablet
                                ? "right 65%"
                                : "center 65%"
                        }
                    />
                </ImageContainer>
            </Box>

            <main>
                {/* section one */}
                <Section isMarginBottom>
                    <FadeAndTranslateScrollAnimation
                        translateValue={5}
                        direction="top"
                        as={SectionHeading}
                        triggerOnce
                    >
                        <h1>
                            Highlight the key benefits of using your product
                        </h1>
                        <P>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Porro accusantium in laboriosam,
                        </P>
                    </FadeAndTranslateScrollAnimation>

                    <Box
                        display="grid"
                        flexGap="3em"
                        // maxHeight="calc(100vh - 5em)"
                        gridTemplateColumns={
                            width > screens.largeTablet ? "1fr 1fr" : undefined
                        }
                        gridTemplateRows={
                            width < screens.largeTablet ? "1fr auto" : undefined
                        }
                    >
                        <FadeAndTranslateScrollAnimation
                            translateValue={5}
                            direction="left"
                            as={KeyBenefitsButtonsContainer}
                            triggerOnce
                        >
                            <HighlightBenefitButton
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
                            </HighlightBenefitButton>
                            <HighlightBenefitButton
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
                            </HighlightBenefitButton>
                        </FadeAndTranslateScrollAnimation>
                        <FadeAndTranslateScrollAnimation
                            translateValue={5}
                            direction="right"
                            as={ImageContainer}
                            triggerOnce
                        >
                            <ImageContainer>
                                <Image
                                    src={highlightedImage}
                                    alt="benefits"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </ImageContainer>
                        </FadeAndTranslateScrollAnimation>
                    </Box>
                </Section>

                <Section isMarginBottom>
                    <FadeAndTranslateScrollAnimation
                        translateValue={5}
                        direction="top"
                        as={SectionHeading}
                        triggerOnce
                    >
                        <h1>Frequently asked questions</h1>
                        <P>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Porro accusantium in laboriosam,
                        </P>
                    </FadeAndTranslateScrollAnimation>
                    <Box
                        width={width < screens.largeHandset ? "100%" : "70%"}
                        m="auto"
                    >
                        <FadeAndTranslateScrollAnimation
                            translateValue={5}
                            triggerOnce
                        >
                            <AccordionContainer>
                                <Accordion title="Question One">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Similique perferendis
                                    quisquam reprehenderit blanditiis, ullam
                                    corporis.
                                </Accordion>
                                <Accordion title="Question Two">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Similique perferendis
                                    quisquam reprehenderit blanditiis, ullam
                                    corporis.
                                </Accordion>
                                <Accordion title="Question Three">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Similique perferendis
                                    quisquam reprehenderit blanditiis, ullam
                                    corporis.
                                </Accordion>
                                <Accordion title="Question Four">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Similique perferendis
                                    quisquam reprehenderit blanditiis, ullam
                                    corporis.
                                </Accordion>
                                <Accordion title="Question Five">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Similique perferendis
                                    quisquam reprehenderit blanditiis, ullam
                                    corporis.
                                </Accordion>
                            </AccordionContainer>
                        </FadeAndTranslateScrollAnimation>
                    </Box>
                </Section>

                <Section>
                    <FadeAndTranslateScrollAnimation
                        translateValue={5}
                        direction="top"
                        as={SectionHeading}
                        triggerOnce
                    >
                        <h1>Customer testimonials</h1>
                    </FadeAndTranslateScrollAnimation>
                    <div style={{ overflow: "hidden" }}>
                        <feedbackStyles.CustomerFeedbackContainer>
                            {/* <Box display="flex"> */}

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
                            {/* </Box> */}
                        </feedbackStyles.CustomerFeedbackContainer>
                    </div>
                </Section>
            </main>
        </>
    );
}
