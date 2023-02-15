import BookCard, { BookCardSkeleton } from "../molecules/BookCard";
import mainPhoto from "../../assets/mainPhoto.jpg";
import styled from "styled-components";
import { mediaQueryMax, mediaQueryMin } from "../../styles/mediaQuery";

interface IBookPage {
    data: any;
}

const Container = styled.div`
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
    `}
`;

export default function BookPage({ data }: IBookPage) {
    return (
        <Container>
            {data ? (
                data.items.map((item: any) => {
                    return (
                        <BookCard
                            key={item.id}
                            title={item.volumeInfo.title}
                            author={item.volumeInfo.authors}
                            img={
                                item.volumeInfo.imageLinks?.thumbnail ||
                                mainPhoto
                            }
                            price={99.9}
                            id={item.id}
                        />
                    );
                })
            ) : (
                <BookCardSkeleton count={50} />
            )}
        </Container>
    );
}
