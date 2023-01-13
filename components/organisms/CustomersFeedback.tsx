import styles from "./CustomersFeddback.module.scss";
import Image from "next/image";
import styled from "styled-components";
import { constants } from "fs/promises";

const CustomerFeedback = styled.div`
    background-color: ${(props) => props.theme.secondary};
    border-radius: 0.7em;
    padding: 1.7em;
`;

const CustomerInfo = styled.div`
    display: flex;
    gap: 0.7em;
    margin-top: 1.5em;
`;

const ImageContainer = styled.div`
    width: 3.7em;
    height: 3.7em;
    border-radius: 0.7em;
`;

const UserName = styled.div`
    color: ${(props) => props.theme.primaryText};
    font-weight: 600;
`;

const UserBio = styled.div`
    font-size: 0.9rem;
    color: ${(props) => props.theme.secondaryText};
`;

export default function ({ img }: any) {
    return (
        <CustomerFeedback>
            <div style={{ textAlign: "center" }}>stars</div>
            <p style={{ color: "black", textAlign: "center" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus sapiente, repellat impedit dicta placeat at, eveniet
            </p>
            <CustomerInfo>
                <ImageContainer>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "0.7em",
                        }}
                        src={img}
                        alt="userImage"
                    />
                </ImageContainer>
                <div style={{ alignSelf: "flex-end" }}>
                    <UserName>User Name</UserName>
                    <UserBio>Writer - Reader</UserBio>
                </div>
            </CustomerInfo>
        </CustomerFeedback>
    );
}
