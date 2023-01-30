import Image from "next/image";
import styled from "styled-components";
import Stars from "../atoms/Stars";

const Container = styled.div`
    background-color: ${(props) => props.theme.neutral3};
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

const UserTitle = styled.div`
    font-size: 0.9rem;
    color: ${(props) => props.theme.neutral1};
`;

export default function CustomersFeedback({
    img,
    name,
}: {
    img: any;
    name: string;
}) {
    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Stars stars={5} />
            </div>
            <p>
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
                    <UserName>{name}</UserName>
                    <UserTitle>Writer</UserTitle>
                </div>
            </CustomerInfo>
        </Container>
    );
}
