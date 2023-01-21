import Image from "next/image";
import mainPhoto from "../../assets/mainPhoto.jpg";
import styled from "styled-components";

const ImageContainer = styled.div`
    width: 5em;
    height: 5em;
`;

export default function (props: any) {
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
                <div>reviewer: {props.reviewer}</div>
            </div>
            <div>
                <div>stars: {props.stars}</div>
            </div>
            <div>comment: {props.comment}</div>
        </div>
    );
}
