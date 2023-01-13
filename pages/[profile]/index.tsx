import Button from "../../components/atoms/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import Reviews from "../../components/organisms/Reviews";
import BookCard from "../../components/organisms/BookCard";
import mainPhoto from "../../assets/mainPHoto.jpg";
import { useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { mediaQueryMax } from "../../styles/mediaQuery";

let getUserData = async () => {
    return await fetch(
        `http://localhost:3000/api/users/63a61276d9c9028b77dfac6c`
    ).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

export async function getServerSideProps({ req }: any) {
    const queryClient = new QueryClient();

    const session = await getSession({ req });
    await queryClient.prefetchQuery("user data", getUserData);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            session,
        },
    };
}

const ProfileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1.5em;
    padding: 2em 0;
    border-radius: 1.5em;
`;

const MainInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;

const ImageContainer = styled.div`
    width: 5em;
    height: 5em;
`;

const UserName = styled.div`
    color: ${(props) => props.theme.primaryText};
    font-weight: 600;
    font-size: 1.3rem;
`;

const UserTitle = styled.div`
    color: ${(props) => props.theme.secondaryText};
    font-size: 0.8rem;
    margin-top: -0.1em;
`;

const InfoParentContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2em;
    margin-left: 0.5em;
    ${mediaQueryMax("smallDesktop")`
        grid-template-columns: repeat(1, 100%);
    `}
`;

const InfoChildContainer = styled.div`
    background-color: ${(props) => props.theme.secondary};
    padding: 0 2em;
`;

export default function () {
    let [isInfoOpened, setIsInfoOpened] = useState(true);
    let [isReviewsOpened, setIsReviewsOpened] = useState(false);

    const { data, isFetching, refetch } = useQuery("user data", getUserData);

    return (
        <main>
            <ProfileHeader>
                <MainInfo>
                    <ImageContainer>
                        <Image
                            className="image"
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "100%",
                                border: "solid 0.2em #0f1219",
                            }}
                            src={img}
                            alt="Picture of the author"
                            width={500}
                            height={500}
                        />
                    </ImageContainer>
                    <div>
                        <UserName>userName</UserName>
                        <UserTitle>reader</UserTitle>
                    </div>
                </MainInfo>
                <Button text="connect" approach="primary" />
            </ProfileHeader>

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
                    onClick={() => setIsInfoOpened(!isInfoOpened)}
                >
                    <BsFillTriangleFill />
                    <h2>Info</h2>
                </button>
                {isInfoOpened && (
                    <InfoParentContainer>
                        <InfoChildContainer>
                            <div>
                                <h3>About</h3>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quia officia fugit
                                    repudiandae voluptatibus praesentium quidem
                                    fuga autem aspernatur blanditiis. Obcaecati
                                    dicta facilis neque doloribus, modi
                                    reiciendis minus maiores quisquam rem?
                                </div>
                            </div>
                            <div>
                                <h3>Favourite genres</h3>
                                <div className="tagsList">
                                    <Button approach="tag" text="scientific" />
                                    <Button approach="tag" text="historic" />
                                    <Button approach="tag" text="novel" />
                                </div>
                            </div>
                            <div>
                                <h3>Books read</h3>
                                <div className="booksList">
                                    <BookCard img={mainPhoto} />
                                    <BookCard img={mainPhoto} />
                                    <BookCard img={mainPhoto} />
                                    <Button
                                        text="View All"
                                        approach="secondary"
                                    />
                                </div>
                            </div>
                        </InfoChildContainer>
                        <InfoChildContainer>
                            <h3>Connections</h3>
                            <div>X connections</div>
                            <div>connections sample</div>
                            <Button text="View All" approach="secondary" />
                        </InfoChildContainer>
                    </InfoParentContainer>
                )}
            </div>

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
                <InfoChildContainer>
                    <div>{isReviewsOpened && <Reviews />}</div>
                </InfoChildContainer>
            </div>
        </main>
    );
}
