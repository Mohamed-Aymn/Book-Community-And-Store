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
import BookSlider from "../../components/organisms/BookSlider";
import Accordion from "../../components/molecules/Accordion";

let getUserData = async () => {
    return await fetch(
        `http://localhost:3000/api/users/63a61276d9c9028b77dfac6c`
    ).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

export async function getServerSideProps({ req }: any) {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("user data", getUserData);
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            session,
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

export default function () {
    const { data, isFetching, refetch } = useQuery("user data", getUserData);

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
                                <UserName>userName</UserName>
                                <UserTitle>reader</UserTitle>
                            </NameAndTitleContainer>
                        </MainInfo>
                        <div style={{ alignSelf: "flex-end" }}>
                            <Button text="connect" approach="primary" />
                        </div>
                    </div>

                    <About>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia officia fugit repudiandae voluptatibus praesentium
                        quidem fuga autem aspernatur blanditiis. Obcaecati dicta
                        facilis neque doloribus, modi reiciendis minus maiores
                        quisquam rem?
                    </About>
                </ProfileHeaderContent>
            </ProfileHeaderBackground>
            <main>
                <Accordion title="Info" isOpened={true}>
                    <TwoColumnsInfo>
                        <div>
                            <h3>Connections</h3>
                            <div>X connections</div>
                            <div>connections sample</div>
                            <Button text="View All" approach="secondary" />
                        </div>
                        <div>
                            <h3>Favourite genres</h3>
                            <div className="tagsList">
                                <Button approach="tag" text="scientific" />
                                <Button approach="tag" text="historic" />
                                <Button approach="tag" text="novel" />
                            </div>
                        </div>
                    </TwoColumnsInfo>
                    <div>
                        <h3>Books read</h3>
                        <div className="booksList">
                            <BookCard img={mainPhoto} />
                            <Button text="View All" approach="secondary" />
                        </div>
                    </div>
                </Accordion>
                <Accordion title="Reviews" isOpened={false}>
                    <Reviews />
                </Accordion>
            </main>
        </>
    );
}
