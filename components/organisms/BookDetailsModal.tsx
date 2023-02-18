import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/Button";
import styled from "styled-components";
import { mediaQueryMax, mediaQueryMin } from "../../styles/mediaQuery";
import { useQuery } from "react-query";
import { getSpecificBook } from "../../query_functions/SpecificBookQuery";
import TagList from "../molecules/TagList";
import parse from "html-react-parser";
import bookStore from "../../client_state/useBookStore";
import LoadingSpinner from "../atoms/LoadingSpinner";

const ModalBackground = styled.div<ITransitionState>`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.342);
    z-index: 4;
    transition: 300ms ease-in-out;
    ${({ TransitionState }) => {
        switch (TransitionState) {
            case "entering":
                return `
                    opacity: 1;
                    `;
            case "entered":
                return `
                    opacity: 1;
                `;
            case "exiting":
                return `
                    opacity: 0;
                `;
            case "exited":
                return `
                    opacity: 0;
                `;
        }
    }};
`;

const Modal = styled.div<ITransitionState>`
    position: fixed;
    top: 50px;
    height: 100vh;
    overflow: scroll;

    transition: 300ms 500ms ease-in-out;
    background-color: ${(props) => props.theme.body};
    z-index: 5;
    ${mediaQueryMax("largeTablet")`
        width: 100%; 
    `}
    ${mediaQueryMin("largeTablet")`
        inset: 0 0 0 35%;
    `}

    ${({ TransitionState }) => {
        switch (TransitionState) {
            case "entering":
                return `
                    transform: translateX(0);
                    `;
            case "entered":
                return `
                    transform: translateX(0);
                `;
            case "exiting":
                return `
                transform: translateX(100%);
                ${mediaQueryMax("largeTablet")`
                    transform: translateY(100%);
                `}
                `;
            case "exited":
                return `
                    transform: translateX(100%);
                    ${mediaQueryMax("largeTablet")`
                        transform: translateY(100%);
                    `}
                `;
        }
    }};
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
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

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2em;
`;

const DescriptionBody = styled.div`
    overflow: hidden;
`;

export default function BookDetailsModal({
    TransitionState,
}: ITransitionState) {
    const setDisplayingBookDetails = bookStore(
        (state: any) => state.setDisplayingBookDetails
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
        <ModalBackground TransitionState={TransitionState}>
            <Modal TransitionState={TransitionState}>
                {bookDetails ? (
                    <>
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
                                    onClick={() =>
                                        setDisplayingBookDetails(false)
                                    }
                                />
                            </Link>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <ImageContainer>
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center center",
                                        }}
                                        src={
                                            bookDetails?.volumeInfo?.imageLinks
                                                ?.thumbnail
                                        }
                                        alt="Book photo"
                                        width={500}
                                        height={500}
                                    />
                                </ImageContainer>
                                <Title>{bookDetails.volumeInfo?.title}</Title>
                                <Author>
                                    {bookDetails.volumeInfo?.authors}
                                </Author>
                                <div style={{ textAlign: "center" }}>stars</div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {bookDetails.volumeInfo?.categories && (
                                        <TagList
                                            list={
                                                bookDetails.volumeInfo
                                                    ?.categories
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <h3>Discription</h3>
                                    <div>$99</div>
                                </div>
                                <DescriptionBody>
                                    {(bookDetails.volumeInfo?.description &&
                                        parse(
                                            bookDetails.volumeInfo.description
                                        )) ||
                                        "There is no provided description"}
                                </DescriptionBody>
                                <div style={{ margin: "1em 0" }}>
                                    <Button
                                        approach="primary"
                                        text="Add to cart"
                                        width="full"
                                    />
                                </div>
                            </div>
                        </ModalBody>
                    </>
                ) : (
                    <LoadingSpinner />
                )}
            </Modal>
        </ModalBackground>
    );
}
