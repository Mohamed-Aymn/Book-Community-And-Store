import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/Button";
import styled from "styled-components";
import { mediaQueryMin } from "../../styles/mediaQuery";
import { useQuery } from "react-query";
import { getSpecificBook } from "../../query_functions/SpecificBookQuery";
import TagList from "../molecules/TagList";
import parse from "html-react-parser";
import bookStore from "../../client_state/useBookStore";

const ModalBackground = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.055);
    z-index: 4;
`;

const Modal = styled.div`
    position: fixed;
    inset: 0;
    background-color: ${(props) => props.theme.body};
    z-index: 5;
    ${mediaQueryMin("largeTablet")`
        inset: 0 0 0 35%;
    `}
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
`;

const About = styled.div`
    text-align: center;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 11em;
    height: 17em;
    margin: "1em 0";
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-top: 1em;
`;

const Author = styled.div`
    text-align: center;
    opacity: 0.5;
    font-size: 0.8rem;
`;

const SubDetailsContainer = styled.div`
    margin: 1em 0;
`;

const ModalBody = styled.div`
    padding: 0 2em;
    height: 100%;
`;

const Price = styled.div``;

export default function BookDetailsModal() {
    const setDisplayingBookDetails = bookStore(
        (state: any) => state.setDisplayingBookDetails
    );
    const setDisplayedBookId = bookStore(
        (state: any) => state.setDisplayedBookId
    );
    const displayedBookId = bookStore((state: any) => state.displayedBookId);
    const { data: bookDetails } = useQuery(
        ["specific-book", displayedBookId],
        () => getSpecificBook(displayedBookId)
    );

    let author;
    if (bookDetails) {
        bookDetails.author === undefined
            ? (author = "Unknown")
            : typeof bookDetails.author == "object"
            ? (author = `${bookDetails.author[0]} and more`)
            : null;
    }

    return (
        <ModalBackground>
            {bookDetails && (
                <Modal>
                    <ModalHeader>
                        <Button
                            approach="tertiary"
                            text="X"
                            onClick={() => {
                                setDisplayingBookDetails(false);
                            }}
                        />
                        <Link href={`/store/${displayedBookId}`}>
                            <Button
                                approach="tertiary"
                                text="open in a new window to display full detials"
                                onClick={() => setDisplayingBookDetails(false)}
                            />
                        </Link>
                    </ModalHeader>
                    <ModalBody>
                        <ImageContainer>
                            <Image
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center center",
                                }}
                                src={
                                    bookDetails.volumeInfo.imageLinks.thumbnail
                                }
                                alt="Picture of the author"
                                width={500}
                                height={500}
                            />
                        </ImageContainer>
                        <Title>{bookDetails.volumeInfo.title}</Title>
                        <Author>{bookDetails.volumeInfo.authors}</Author>
                        <div style={{ textAlign: "center" }}>stars</div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {bookDetails.volumeInfo.categories && (
                                <TagList
                                    list={bookDetails.volumeInfo.categories}
                                />
                            )}
                        </div>
                        <SubDetailsContainer>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3>Discription</h3>
                                <Price>$99</Price>
                            </div>
                            <p>
                                {(bookDetails.volumeInfo.description &&
                                    parse(
                                        bookDetails.volumeInfo.description
                                    )) ||
                                    "There is not description provided"}
                            </p>
                        </SubDetailsContainer>

                        <Button
                            approach="primary"
                            text="Add to cart"
                            width="full"
                        />
                    </ModalBody>
                </Modal>
            )}
        </ModalBackground>
    );
}
