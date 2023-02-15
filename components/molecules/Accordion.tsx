import React, { useState, useCallback, useRef, ReactNode } from "react";

import styled from "styled-components";

type DirectionType = "top" | "right" | "bottom" | "left";

interface ChevronProps {
    direction: DirectionType;
}

interface AccordionProps {
    title: string;
    children: ReactNode;
    isOpened?: boolean;
}

export const AccordionContainer = styled.div<{ children: JSX.Element[] }>`
    display: flex;
    gap: 0.5em;
    flex-direction: column;
`;

const Chevron = styled.div<ChevronProps>`
    border-style: solid;
    border-width: 0.125rem 0.125rem 0 0;
    height: 0.25rem;
    width: 0.25rem;
    transition: all 0.25s ease-in-out;

    transform: ${(p) => p.direction === "top" && "rotate(-45deg)"};
    transform: ${(p) => p.direction === "right" && "rotate(45deg)"};
    transform: ${(p) => p.direction === "bottom" && "rotate(135deg)"};
    transform: ${(p) => p.direction === "left" && "rotate(-135deg)"};
`;

const AccordtionItem = styled.div`
    padding: 0 1.25rem;
    border: solid 0.01em ${(props) => props.theme.neutral3};
`;

const Title = styled.div<{ isExpanded: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 1rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 0.5em;
    transition: 0.25s ease-in-out;
    cursor: pointer;
    ${({ isExpanded, theme }) =>
        isExpanded &&
        `
    border-bottom: solid 0.01em ${theme.text};
    `}
`;

const ContentWrapper = styled.div<{ maxHeight: number }>`
    max-height: ${(p) => `${p.maxHeight}px`};
    transition: max-height 0.25s ease-in-out;
    overflow: hidden;
`;

interface IContent {
    ref: any;
}

const Content = styled.div<IContent>`
    padding: 1.5em 0em;
    line-height: 1.5;
`;

export default function Accordion(props: AccordionProps): JSX.Element {
    const [isExpanded, setExpand] = useState<boolean>(props.isOpened || false);

    const contentRef = useRef<HTMLDivElement>();
    const contentHeight =
        isExpanded && contentRef.current ? contentRef.current.clientHeight : 0;

    const handleExpandToggle = useCallback(() => {
        setExpand(!isExpanded);
    }, [isExpanded]);

    return (
        <AccordtionItem>
            <Title onClick={handleExpandToggle} isExpanded={isExpanded}>
                <Chevron direction={isExpanded ? "top" : "bottom"} />
                {props.title}
            </Title>
            <ContentWrapper maxHeight={contentHeight}>
                <Content ref={contentRef}>{props.children}</Content>
            </ContentWrapper>
        </AccordtionItem>
    );
}
