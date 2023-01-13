import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import MainPhoto from "../../assets/mainPhoto.jpg";

const FirstTitleLine = styled.div`
    font-size: 5.5rem;
    margin-left: -0.07em;
    font-weight: 100;
    color: ${(props) => props.theme.primaryText};
`;

const SecondTitleLine = styled.div`
    margin-top: -0.3em;
    font-size: 3rem;
    font-weight: 800;
    color: ${(props) => props.theme.primaryText};
`;

const ImageContainer = styled.div`
    width: 100%;
    height: calc(100vh - 15em);
`;

export default function () {
    return (
        <div
            style={{ minHeight: "100vh", paddingTop: "4em", margin: "0 1.7em" }}
        >
            <Link
                href="/about"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    textAlign: "left",
                    width: "fit-content",
                    marginBottom: "1em",
                }}
            >
                <FirstTitleLine>Book</FirstTitleLine>
                <SecondTitleLine>Store</SecondTitleLine>
            </Link>
            <ImageContainer>
                <Image
                    src={MainPhoto}
                    alt="Main photo"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "right-center",
                        borderRadius: "0.7em",
                    }}
                />
            </ImageContainer>
        </div>
    );
}
