import Image from "next/image";
import Reviews from "../../../components/organisms/Reviews";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import mainPhoto from "../../../assets/mainPhoto.jpg";
import { getSpecificBook } from "../../../clientState/SpecificBookQuery";
import styled from "styled-components";
import parse from "html-react-parser";
import Button from "../../../components/atoms/Button";

const InformationSection = styled.div`
    display: flex;
    gap: 2em;
`;

const ImageContainer = styled.div`
    width: 30em;
    height: 40em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.neutral3};
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-top: 1em;
    line-height: 2ch;
    margin-bottom: 0.5em;
`;

const Author = styled.div`
    font-size: 1rem;
    margin-bottom: 1em;
`;

export default function ({ img }: any) {
    let router = useRouter();
    let { details: id } = router.query;

    const { data: bookDetails } = useQuery(["specific-book", id], () =>
        getSpecificBook(id as string)
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
        <main>
            <InformationSection>
                <ImageContainer>
                    <Image
                        src={
                            bookDetails?.volumeInfo?.imageLinks.thumbnail ||
                            mainPhoto
                        }
                        alt="Book Image"
                        width={300}
                        height={400}
                    />
                </ImageContainer>

                <div>
                    <Title>{bookDetails?.volumeInfo?.title}</Title>
                    <Author>{author}</Author>
                    {bookDetails && (
                        <>
                            <div>stars</div>
                            <div>
                                pages: {bookDetails.volumeInfo.printedPageCount}
                            </div>
                            <div>is Ebook?: {bookDetails.saleInfo.isEbook}</div>
                            <div>
                                saleability: {bookDetails.saleInfo.saleability}
                            </div>
                            <div>{bookDetails?.volumeInfo?.lang}</div>

                            <div>Discription</div>
                            <p>
                                {(bookDetails?.volumeInfo.description &&
                                    parse(
                                        bookDetails.volumeInfo.description
                                    )) ||
                                    "There is not description provided"}
                            </p>
                            <Button approach="primary" text="Add to cart" />
                        </>
                    )}
                </div>
            </InformationSection>

            <div>
                <h2>Reviews</h2>
                <div>
                    {bookDetails?.reviews &&
                        bookDetails.reviews?.data.map((review: any, i: any) => {
                            return (
                                <Reviews
                                    key={i}
                                    reviewer={review.reviewer.name}
                                    stars={review.stars}
                                    comment={review.comment}
                                />
                            );
                        })}
                    {!bookDetails?.reviews?.data && (
                        <div>there are no reviews for this book</div>
                    )}
                </div>
            </div>
        </main>
    );
}
