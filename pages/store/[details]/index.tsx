import Image from "next/image";
import Reviews from "../../../components/organisms/Reviews";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { layoutStore } from "../../../clientState/layoutStore";
import { useQuery, dehydrate, QueryClient } from "react-query";
import mainPhoto from "../../../assets/mainPhoto.jpg";

let bookDetails = async (id: any) => {
    return fetch(`http://localhost:3000/api/books/${id}`).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

export async function getServerSideProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("Book details", bookDetails);

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}

export default function ({ img }: any) {
    let router = useRouter();
    let { details: id } = router.query;
    const { data } = useQuery(["Book details", { id }], () => bookDetails(id), {
        staleTime: 60 * 1000,
    });

    // const bookDetails = layoutStore((state: any) => state.bookDetails);
    // const id = layoutStore((state: any) => state.id);
    // const setId = layoutStore((state: any) => state.setId);

    // useEffect(() => {
    //     router.push({
    //         pathname: "/store/book",
    //         query: { id: "something" },
    //     });
    // }, []);

    // console.log(data?.volumeInfo.imageLinks.thumbnail);

    // const src = { src: data?.volumeInfo.imageLinks.thumbnail };

    return (
        <main>
            <div className="bookInfoContainer">
                <Image
                    src={data?.volumeInfo.imageLinks.thumbnail || mainPhoto}
                    className="bookMainImage"
                    alt="Book Image"
                    width={400}
                    height={500}
                />

                <div>
                    <h1>{data?.volumeInfo.title}</h1>
                    <div>rate (stars)</div>
                    <div>author</div>
                    <div>publish date</div>
                    <div>pages</div>
                    <div>printed / Electronic</div>
                    <div>available / not</div>
                    <div>lang</div>
                </div>
            </div>

            <div>
                <h2>Reviews</h2>
                <div>
                    {data?.reviews &&
                        data.reviews.map((review: any, i: any) => {
                            return (
                                <Reviews
                                    key={i}
                                    reviewer={review.reviewer}
                                    stars={review.stars}
                                    comment={review.comment}
                                />
                            );
                        })}
                    {!data?.reviews && (
                        <div>there are no reviews for this book</div>
                    )}
                </div>
            </div>
        </main>
    );
}
