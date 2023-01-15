import Image from "next/image";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useQuery, dehydrate, QueryClient } from "react-query";
import styled from "styled-components";

let getReviewerData = async (id: any) => {
    return fetch(`http://localhost:3000/api/users/${id}`).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("Reviewer data", getReviewerData);
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}

const ImageContainer = styled.div`
    width: 5em;
    height: 5em;
`;

export default function (props: any) {
    let reviewerId = props.reviewer;

    const { data: reviewer } = useQuery(
        ["Reviewer data", { reviewerId }],
        () => getReviewerData(reviewerId),
        {
            staleTime: 60 * 1000,
        }
    );

    return (
        <div>
            <div>
                <ImageContainer>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        src={mainPhoto}
                        alt="userImage"
                    />
                </ImageContainer>
                <div>reviewer: {reviewer?.name}</div>
            </div>
            <div>
                <div>stars: {props.stars}</div>
            </div>
            <div>comment: {props.comment}</div>
        </div>
    );
}
