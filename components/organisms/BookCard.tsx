import Image from "next/image";
import { layoutStore } from "../../clientState/layoutStore";
import BookDetailsModal from "./BookDetailsModal";
import styled from "styled-components";

interface IBookCard {
    // any is temporary here
    img: string | any;
    title: string;
    price: number;
    author: string;
}

const BookCard = styled.button`
    padding: 1.5em 1em 1em 1em;
    margin: 0 auto;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 30px #02020252;
    }
    &:hover {
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

export default function (props: Partial<IBookCard>) {
    let { img, title, price, author } = props;

    const setDisplayingBookDetails = layoutStore(
        (state: any) => state.setDisplayingBookDetails
    );
    const isDisplayingBookDetails = layoutStore(
        (state: any) => state.isDisplayingBookDetails
    );
    const setBookDetials = layoutStore((state: any) => state.setBookDetials);

    author === undefined
        ? (author = "Unknown")
        : typeof author == "object"
        ? (author = `${author[0]} and more`)
        : null;

    return (
        <>
            <BookCard
                onClick={() => {
                    setBookDetials(props);
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
            </BookCard>
            {isDisplayingBookDetails && <BookDetailsModal />}
        </>
    );
}
