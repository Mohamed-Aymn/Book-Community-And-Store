import Button from "../../components/molecules/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import Reviews from "../../components/organisms/Reviews";
import BookCard from "../../components/organisms/BookCard";
import mainPhoto from "../../assets/mainPHoto.jpg";
import { useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { useQuery, dehydrate, QueryClient } from "react-query";

let getUserData = async () => {
    return await fetch(
        `http://localhost:3000/api/users/63a61276d9c9028b77dfac6c`
    ).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

export async function getServerSideProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery("user data", getUserData);
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}

export default function () {
    let [isInfoOpened, setIsInfoOpened] = useState(true);
    let [isReviewsOpened, setIsReviewsOpened] = useState(false);

    const { data, isFetching, refetch } = useQuery("user data", getUserData);

    return (
        <main>
            <div className="profileHeader">
                <div className="mainInfo">
                    <Image
                        className="image"
                        src={img}
                        alt="Picture of the author"
                    />
                    <div>
                        <div className="userName">{data.name}</div>
                        <div className="userTitle">{data.title}</div>
                    </div>
                </div>
                <Button text="connect" type="primary" />
            </div>

            <div className="profileBody">
                <button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.7em",
                    }}
                    onClick={() => setIsInfoOpened(!isInfoOpened)}
                >
                    <BsFillTriangleFill />
                    <h2>Info</h2>
                </button>
                {isInfoOpened && (
                    <div className="infoContent">
                        <div className="infoContentChild">
                            <div>
                                <h3>About</h3>
                                <div className="bio">{data.about}</div>
                            </div>
                            <div>
                                <h3>Favourite genres</h3>
                                <div className="tagsList">
                                    <Button type="tag" text="scientific" />
                                    <Button type="tag" text="historic" />
                                    <Button type="tag" text="novel" />
                                </div>
                            </div>
                            <div>
                                <h3>Books read</h3>
                                <div className="booksList">
                                    <BookCard img={mainPhoto} />
                                    <BookCard img={mainPhoto} />
                                    <BookCard img={mainPhoto} />
                                    <Button text="View All" type="secondary" />
                                </div>
                            </div>
                        </div>
                        <div className="infoContentChild">
                            <h3>Connections</h3>
                            <div>X connections</div>
                            <div>connections sample</div>
                            <Button text="View All" type="secondary" />
                        </div>
                    </div>
                )}

                <div>
                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.7em",
                        }}
                        onClick={() => setIsReviewsOpened(!isReviewsOpened)}
                    >
                        <BsFillTriangleFill />
                        <h2>Reviews</h2>
                    </button>
                    <div className="reviews">
                        {isReviewsOpened && <Reviews />}
                    </div>
                </div>
            </div>
        </main>
    );
}