import styles from "./Reviews.module.scss";
import Image from "next/image";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useQuery, dehydrate, QueryClient } from "react-query";

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
        <div className={styles.mainContainer}>
            <div>
                <Image
                    className={styles.userImage}
                    src={mainPhoto}
                    alt="userImage"
                />
                <div>reviewer: {reviewer?.name}</div>
            </div>
            <div>
                <div>stars: {props.stars}</div>
            </div>
            <div>comment: {props.comment}</div>
        </div>
    );
}
