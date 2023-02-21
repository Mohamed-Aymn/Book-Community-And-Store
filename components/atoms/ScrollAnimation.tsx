import { useInView } from "react-intersection-observer";
import styled from "styled-components";

interface IScrollAnimation {
    inView: boolean;
    direction: "top" | "bottom" | "right" | "left" | "none";
    translateValue: number;
    duration: number;
}

export const ScrollAnimationStyles = styled.div<IScrollAnimation>`
    transition: ${({ duration }) => duration}ms ease-in-out;
    opacity: 0;

    ${({ direction, translateValue }) =>
        direction === "top"
            ? `

        transform: translateY(-${translateValue}em);
        `
            : direction === "bottom"
            ? `
        transform: translateY(${translateValue}em);
        `
            : direction === "right"
            ? `

        transform: translateX(${translateValue}em);
        `
            : direction === "left"
            ? `
        transform: translateX(-${translateValue}em);
        `
            : ``};

    ${({ inView }) =>
        inView &&
        `
        transform: translate(0);
        opacity: 1;
        display: block;

    `};
`;

export function FadeAndTranslateScrollAnimation({
    children,
    direction,
    as,
    translateValue,
    threshold,
    delay,
    triggerOnce,
    duration,
}: {
    children: JSX.Element[] | JSX.Element;
    direction?: "top" | "bottom" | "left" | "right" | "none";
    as?: any;
    translateValue: number;
    threshold?: number;
    delay?: number;
    triggerOnce?: boolean;
    duration?: number;
}) {
    const { ref, inView } = useInView({
        threshold: threshold || 0,
        triggerOnce: triggerOnce,
        delay: delay || undefined,
    });
    return (
        <ScrollAnimationStyles
            ref={ref}
            as={as || "div"}
            inView={inView}
            direction={direction || "none"}
            translateValue={translateValue.toString()}
            duration={duration?.toString() || "500"}
        >
            {children}
        </ScrollAnimationStyles>
    );
}
