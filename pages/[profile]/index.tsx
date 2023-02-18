import Button from "../../components/atoms/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import Reviews from "../../components/organisms/Reviews";
import BookCard from "../../components/molecules/BookCard";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { getSession, useSession } from "next-auth/react";
import * as styles from "../../styles/profileStyles";
import Accordion, {
    AccordionContainer,
} from "../../components/molecules/Accordion";
import getUserData from "../../query_functions/getUserData";
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

export default function Profile({ isOwner = false }: { isOwner: boolean }) {
    let router = useRouter();
    const { data: session, status } = useSession();
    const { data, isFetching } = useQuery(
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
            <styles.ProfileHeaderBackground>
                <styles.ProfileHeaderContent>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <styles.MainInfo>
                            <styles.ImageContainer>
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
                            </styles.ImageContainer>
                            <styles.NameAndTitleContainer>
                                {data?.name && (
                                    <styles.UserName>
                                        {data.name}
                                    </styles.UserName>
                                )}
                                {data?.title && (
                                    <styles.UserTitle>
                                        {data.title}
                                    </styles.UserTitle>
                                )}
                            </styles.NameAndTitleContainer>
                        </styles.MainInfo>
                        <div style={{ alignSelf: "flex-end" }}>
                            {isOwner ? (
                                <Link
                                    href={`${session?.user._id}/settings`}
                                    style={{ textDecoration: "none" }}
                                >
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

                    {data?.bio && <styles.About>{data.bio}</styles.About>}
                </styles.ProfileHeaderContent>
            </styles.ProfileHeaderBackground>
            <main>
                <AccordionContainer>
                    <Accordion title="Info" isOpened={true}>
                        <styles.TwoColumnsInfo>
                            <div>
                                <h3>Community</h3>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "1em",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        Followers:{" "}
                                        {data?.followers &&
                                            data.followers.length}
                                    </div>
                                    <div>
                                        Following:{" "}
                                        {data?.following &&
                                            data.following.length}
                                    </div>
                                    <Link
                                        href={`/${session?.user._id}/community`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <Button
                                            text="View All"
                                            approach="tertiary"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h3>Favourite genres</h3>
                                {data?.favouriteGenres &&
                                data?.favouriteGenres.length !== 0 ? (
                                    data.favouriteGenres.map(
                                        (genre: any, i: number) => {
                                            <Button
                                                approach="tag"
                                                text="scientific"
                                                key={i}
                                            />;
                                        }
                                    )
                                ) : (
                                    <span>there is no favourite genres</span>
                                )}
                            </div>
                        </styles.TwoColumnsInfo>
                        <div>
                            <h3>Books read</h3>
                            {data?.readBooks && data?.readBooks.length !== 0 ? (
                                data.readBooks.map((book: any, i: number) => {
                                    return <BookCard img={mainPhoto} key={i} />;
                                })
                            ) : (
                                <span>user didn&apos;t read any book yet</span>
                            )}

                            <Button text="View All" approach="secondary" />
                        </div>
                    </Accordion>
                    <Accordion title="Reviews" isOpened={false}>
                        {data?.reviews && data?.reviews.length !== 0 ? (
                            data.reviews.map((review: any, i: number) => {
                                return <Reviews key={i} />;
                            })
                        ) : (
                            <span>there is no reviews</span>
                        )}
                    </Accordion>
                </AccordionContainer>
            </main>
        </>
    );
}
