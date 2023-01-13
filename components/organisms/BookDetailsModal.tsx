import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/Button";
import { layoutStore } from "../../clientState/layoutStore";
import styled from "styled-components";
import { mediaQueryMin } from "../../styles/mediaQuery";

const ModalBackground = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.055);
    z-index: 1;
`;

const MobileBookDetailsModal = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.112);
    z-index: 1;
    ${mediaQueryMin("largeTablet")`
        inset: 0 0 0 35%;
    `}
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
`;

const About = styled.div`
    text-align: center;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 11em;
    height: 17em;
    margin: "1em 0";
`;

const Title = styled.div`
    font-size: 1.5rem;
    text-align: center;
`;

const Author = styled.div`
    text-align: center;
    opacity: 0.5;
    font-size: 0.8rem;
`;

const SubDetailsContainer = styled.div`
    margin: 1em 0;
    span {
        font-weight: bold;
    }
`;

export default function () {
    const setDisplayingBookDetails = layoutStore(
        (state: any) => state.setDisplayingBookDetails
    );
    const bookDetails = layoutStore((state: any) => state.bookDetails);

    return (
        <ModalBackground>
            <MobileBookDetailsModal>
                <ModalHeader>
                    <Button
                        approach="primary"
                        text="X"
                        onClick={() => setDisplayingBookDetails(false)}
                    />
                    <Link href={`/store/${bookDetails.id}`}>
                        <Button
                            approach="primary"
                            text="open in a new window to display full detials"
                            onClick={() => setDisplayingBookDetails(false)}
                        />
                    </Link>
                </ModalHeader>

                <About>About</About>
                <ImageContainer>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center center",
                        }}
                        src={bookDetails.img}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                    />
                </ImageContainer>
                <Title>{bookDetails.title}</Title>
                <Author>author</Author>
                <SubDetailsContainer>
                    <span> rate:</span> stars
                    <span> avilability:</span> bla
                    <span> type:</span> printed
                    <span> genre:</span> bla
                </SubDetailsContainer>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                    delectus illum blanditiis iusto consequuntur ....
                </div>
            </MobileBookDetailsModal>
        </ModalBackground>
    );
}
