import Image from "next/image";
import { layoutStore } from "../../clientState/layoutStore";
import BookDetailsModal from "../organisms/BookDetailsModal";
import styled from "styled-components";
import { useRef, useState } from "react";
import Skeleton from "../atoms/Skeleton";

interface IBookCard {
    // any is temporary here
    img: string | any;
    title: string;
    price: number;
    author: string;
    id: string;
    data: object;
}

const Conatiner = styled.button`
    padding: 1.5em 1em 1em 1em;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 30px #02020252;
        transform: scale(1.05);
        transition: transform 0.3s;
    }
`;

const Hr = styled.hr`
    color: ${(props) => props.theme.neutral3};
`;

const BookImage = styled.div`
    width: 11em;
    height: 17em;
    object-fit: cover;
    object-position: center center;
    margin-bottom: 0.7em;
    border-radius: 0.3em;
`;

const Title = styled.div`
    color: ${(props) => props.theme.text};
    text-align: left;
    font-weight: bold;
    height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 19ch;
    text-align: left;
`;

const DetailsInfo = styled.div`
    display: grid;
    grid-template-columns: calc((100% / 3) * 2) calc((100% / 3) * 1);
    margin-top: -0.3em;
`;

const WriterTitle = styled.div`
    text-align: left;
    font-size: 0.6rem;
    color: ${(props) => props.theme.neutral3};
`;

const Author = styled.div`
    font-size: 0.7rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 13ch;
    text-align: left;
    color: ${(props) => props.theme.neutral1};
`;

const BuyNowTitle = styled.div`
    text-align: right;
    font-size: 0.6rem;
    color: ${(props) => props.theme.neutral3};
`;
const Price = styled.div`
    color: ${(props) => props.theme.neutral1};
    font-size: 0.7rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 13ch;
    text-align: right;
`;

export default function BookCard(props: Partial<IBookCard>) {
    let { img, title, price, author, id } = props;

    const setDisplayingBookDetails = layoutStore(
        (state: any) => state.setDisplayingBookDetails
    );
    const isDisplayingBookDetails = layoutStore(
        (state: any) => state.isDisplayingBookDetails
    );
    const setDisplayedBookId = layoutStore(
        (state: any) => state.setDisplayedBookId
    );

    author === undefined
        ? (author = "Unknown")
        : typeof author == "object"
        ? (author = `${author[0]} and more`)
        : null;

    return (
        <Conatiner
            onClick={() => {
                setDisplayedBookId(id);
                setDisplayingBookDetails(true);
            }}
        >
            <BookImage>
                <Image
                    style={{ width: "100%", height: "100%" }}
                    src={img}
                    alt="Book image"
                    width={400}
                    height={500}
                />
            </BookImage>
            <Title>{title}</Title>
            <Hr />
            <DetailsInfo>
                <div>
                    <WriterTitle>Writer</WriterTitle>
                    <Author>{author}</Author>
                </div>
                <div>
                    <BuyNowTitle>Buy now</BuyNowTitle>
                    <Price>${price}</Price>
                </div>
            </DetailsInfo>
        </Conatiner>
    );
}

const SkeletonContainer = styled.div`
    width: 173px;
    height: 307px;
    padding: 1.5em 1em 1em 1em;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
`;

function ComponentSkeleton() {
    return (
        <SkeletonContainer>
            <Skeleton height={15} />
            <Skeleton height={2} />
            <Skeleton height={1.5} />
        </SkeletonContainer>
    );
}

export function BookCardSkeleton({ count }: { count: number }) {
    const fields: JSX.Element[] = [];
    for (let i = 1; i <= count; i++) {
        fields.push(<ComponentSkeleton key={i} />);
    }
    return <>{fields}</>;
}
