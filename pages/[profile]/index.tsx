import Button from "../../components/atoms/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import Reviews from "../../components/organisms/Reviews";
import BookCard from "../../components/organisms/BookCard";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { getSession, useSession } from "next-auth/react";
import styled from "styled-components";
import { mediaQueryMax } from "../../styles/mediaQuery";
import Accordion from "../../components/molecules/Accordion";
import getUserData from "../../query_Functions/getUserData";
import { useRouter } from "next/router";
import Link from "next/link";
import { env } from "../../environment";

export async function getServerSideProps(context: any) {
    let req = context.req;
    const session = await getSession({ req });

    let isOwner;
    if (context.query.profile === session?.user._id) {
        isOwner = true;
    } else {
        isOwner = false;
    }

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        ["user data", session?.user._id],
        async () => await getUserData(session?.user._id)
    );
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            session,
            isOwner,
        },
    };
}

const ProfileHeaderBackground = styled.div`
    background-color: ${(props) => props.theme.neutral3};
`;

const ProfileHeaderContent = styled.div`
    max-width: 140ch;
    padding-top: calc(4em + 3em);
    padding-bottom: 3em;
    margin: 0 auto;
    ${mediaQueryMax("desktop")`
        margin: 0 1.7em;
    `}
`;

const About = styled.p`
    margin-left: 3.7em;
`;

const MainInfo = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 0.3em;
`;

const ImageContainer = styled.div`
    width: 3.7em;
    height: 3.7em;
`;

const NameAndTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 0.3em; */
`;

const UserName = styled.div`
    color: var(--neutral-white-color);
    font-size: 1.1rem;
`;

const UserTitle = styled.div`
    color: var(--neutral-dark-grey-color);
    font-size: 0.8rem;
    margin-top: -0.1em;
`;

const TwoColumnsInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    margin-left: 0.5em;
    ${mediaQueryMax("smallDesktop")`
        grid-template-columns: repeat(1, 100%);
    `}
`;

export default function ({ isOwner = false }: { isOwner: boolean }) {
    let router = useRouter();
    const { data: session, status } = useSession();
    const { data, isFetching, refetch } = useQuery(
        ["user data", router.query.profile],
        async () => await getUserData(router.query.profile)
    );

    let followUser = async () => {
        const res = await fetch(
            `${env.BASE_URL}/api/users/${session?.user._id}/followers`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data._id }),
            }
        );
    };

    let unFollowUser = async () => {
        const res = await fetch(
            `${env.BASE_URL}/api/users/${session?.user._id}/followers/${data._id}`,
            {
                method: "DELETE",
            }
        );
    };

    if (!data && !isFetching) return <main>profile not found</main>;

    if (!data && isFetching) return <main>skeleton</main>;

    return (
        <>
            <ProfileHeaderBackground>
                <ProfileHeaderContent>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <MainInfo>
                            <ImageContainer>
                                <Image
                                    className="image"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "100%",
                                        border: "solid 0.15em #9e9e9e",
                                    }}
                                    src={img}
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                />
                            </ImageContainer>
                            <NameAndTitleContainer>
                                {data?.name && <UserName>{data.name}</UserName>}
                                {data?.title && (
                                    <UserTitle>{data.title}</UserTitle>
                                )}
                            </NameAndTitleContainer>
                        </MainInfo>
                        <div style={{ alignSelf: "flex-end" }}>
                            {isOwner ? (
                                <Link href={`${session?.user._id}/settings`}>
                                    <Button
                                        text="Profile settings"
                                        approach="primary"
                                    />
                                </Link>
                            ) : !isOwner &&
                              data?.followers?.includes(session?.user._id) ? (
                                <Button
                                    text="Unfollow"
                                    approach="primary"
                                    onClick={unFollowUser}
                                />
                            ) : !isOwner &&
                              !data?.followers?.includes(session?.user._id) &&
                              session !== null ? (
                                <Button
                                    text="Follow"
                                    approach="primary"
                                    onClick={followUser}
                                />
                            ) : !isOwner && session == null ? (
                                <Link href="/auth/login">
                                    <Button text="Follow" approach="primary" />
                                </Link>
                            ) : null}
                        </div>
                    </div>

                    {data?.bio && <About>{data.bio}</About>}
                </ProfileHeaderContent>
            </ProfileHeaderBackground>
            <main>
                <Accordion title="Info" isOpened={true}>
                    <TwoColumnsInfo>
                        <div>
                            <h3>Community</h3>
                            <div>
                                Followers:{" "}
                                {data?.followers && data.followers.length}
                            </div>
                            <div>
                                Following:{" "}
                                {data?.following && data.following.length}
                            </div>
                            <Button text="View All" approach="secondary" />
                        </div>
                        <div>
                            <h3>Favourite genres</h3>
                            {data?.favouriteGenres &&
                            data?.favouriteGenres.length !== 0 ? (
                                data.favouriteGenres.map((genre: any) => {
                                    <Button approach="tag" text="scientific" />;
                                })
                            ) : (
                                <span>there is no favourite genres</span>
                            )}
                        </div>
                    </TwoColumnsInfo>
                    <div>
                        <h3>Books read</h3>
                        {data?.readBooks && data?.readBooks.length !== 0 ? (
                            data.readBooks.map((book: any) => {
                                return <BookCard img={mainPhoto} />;
                            })
                        ) : (
                            <span>user didn't read any book yet</span>
                        )}

                        <Button text="View All" approach="secondary" />
                    </div>
                </Accordion>
                <Accordion title="Reviews" isOpened={false}>
                    {data?.reviews && data?.reviews.length !== 0 ? (
                        data.reviews.map((review: any) => {
                            return <Reviews />;
                        })
                    ) : (
                        <span>there is no reviews</span>
                    )}
                </Accordion>
            </main>
        </>
    );
}
