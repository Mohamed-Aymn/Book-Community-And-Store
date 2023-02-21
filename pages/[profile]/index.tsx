import Button from "../../components/atoms/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import Reviews from "../../components/organisms/Reviews";
import BookCard from "../../components/molecules/BookCard";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { getSession, useSession } from "next-auth/react";
import Accordion, {
    AccordionContainer,
} from "../../components/molecules/Accordion";
import getUserData from "../../query_functions/getUserData";
import { useRouter } from "next/router";
import Link from "next/link";
import { env } from "../../environment";
import Box from "../../components/atoms/Box";
import { useTheme } from "styled-components";
import useScreenWidth from "../../hooks/useScreenWidth";
import { screens } from "../../styles/mediaQuery";

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
    const theme = useTheme();
    const width = useScreenWidth();

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
            <Box bg={theme.colors.neutral1}>
                <Box
                    maxWidth="140ch"
                    pt="calc(4em + 3em)"
                    pb="3em"
                    margin={width < screens.desktop ? "0 1.7em" : "0 auto"}
                >
                    <Box display="flex" justifyContent="space-between">
                        <Box
                            display="flex"
                            alignItems="center"
                            flexGap={theme.space.xs}
                        >
                            <Box width="3.7em" height="3.7em">
                                <Image
                                    className="image"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "100%",
                                        border: "solid 0.05em black",
                                    }}
                                    src={img}
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column">
                                {data?.name && (
                                    <Box color={theme.colors.text}>
                                        {data.name}
                                    </Box>
                                )}
                                {data?.title && (
                                    <Box
                                        color={theme.colors.neutral1}
                                        mt="-0.1em"
                                        fontSize={"0.8rem"}
                                    >
                                        {data.title}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Box alignSelf="flex-end">
                            {isOwner ? (
                                <Button
                                    text="Profile settings"
                                    approach="primary"
                                    onClick={() =>
                                        router.push(
                                            `${session?.user._id}/settings`
                                        )
                                    }
                                />
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
                                <Button
                                    text="Follow"
                                    approach="primary"
                                    onClick={() => router.push("/auth/login")}
                                />
                            ) : null}
                        </Box>
                    </Box>

                    {data?.bio && <Box ml={theme.space.md}>{data.bio}</Box>}
                </Box>
            </Box>
            <main>
                <AccordionContainer>
                    <Accordion title="Info" isOpened={true}>
                        <Box
                            display="grid"
                            gridGap={theme.space.md}
                            gridTemplateColumns={
                                width < screens.smallDesktop
                                    ? "100%"
                                    : "1fr 1fr"
                            }
                        >
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
                        </Box>
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
