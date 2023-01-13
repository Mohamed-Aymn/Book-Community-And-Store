import BookCard from "./BookCard";
import mainPhoto from "../../assets/mainPhoto.jpg";
import styled from "styled-components";
import { mediaQueryMax, mediaQueryMin } from "../../styles/mediaQuery";

interface IBookPage {
    data: any;
}

const BookPage = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
    gap: 1em 0;
    margin: 2em 0;
    min-height: calc(100vh - 31em);

    ${mediaQueryMax("desktop")`
        grid-template-columns: repeat(5, 1fr);
    `}
    ${mediaQueryMax("smallDesktop")`
        grid-template-columns: repeat(4, 1fr);
    `}
    ${mediaQueryMax("largeTablet")`
        grid-template-columns: repeat(2, 1fr);
    `}
    ${mediaQueryMax("largeHandset")`
        grid-template-columns: repeat(2, 1fr);
    `}
    ${mediaQueryMax("smallHandset")`
        grid-template-columns: repeat(1, 1fr);
    `} /* 
    @include media("<=1250px") {
        grid-template-columns: repeat(6, 1fr);
    }
    @include media("<=1080px") {
        grid-template-columns: repeat(5, 1fr);
    }
    @include media("<=940px") {
        grid-template-columns: repeat(4, 1fr);
    }
    @include media("<=755px") {
        grid-template-columns: repeat(3, 1fr);
    }
    @include media("<=590px") {
        grid-template-columns: repeat(2, 1fr);
    }
    @include media("<=390px") {
        grid-template-columns: repeat(1, 1fr);
    } */
`;

export default function ({ data }: IBookPage) {
    return (
        <BookPage>
            {data?.items?.map((item: any) => {
                return (
                    <BookCard
                        key={item.id}
                        title={item.volumeInfo.title}
                        author={item.volumeInfo.authors}
                        img={item.volumeInfo.imageLinks?.thumbnail || mainPhoto}
                        price={99.9}
                    />
                );
            })}
        </BookPage>
    );
}
