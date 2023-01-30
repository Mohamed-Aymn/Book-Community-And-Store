import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import MainPhoto from "../../assets/mainPhoto.jpg";
import Button from "../atoms/Button";
import { BsArrowUpRight } from "react-icons/bs";

const ImageContainer = styled.div`
    width: 100%;
    height: calc(100vh - 18em);
`;

const Title = styled.div`
    /* display: flex;
    justify-content: space-between;
    align-items: flex-end; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    /* gap: 0.5em 0; */
    margin: 2em 0;
    /* text-align: left; */
    width: fit-content;
    margin-bottom: 1em;
    /* align-items: left; */
    gap: 5em;
    width: 100%;
    height: 13em;
`;

const TitleMainElement = styled.div`
    font-size: 3.7rem;
    margin-left: -0.07em;
    font-weight: 800;
    color: ${(props) => props.theme.text};
    line-height: 1.5ch;
    div {
        font-weight: 800;
        font-size: 3.5rem;
        line-height: 1.6ch;
        /* color: #5f5f5f; */
        color: transparent;
        -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: ${(props) => props.theme.text};
    }
    span {
        display: block;
    }
    /* div {
        font-weight: 800;
        font-size: 1.7rem;
        color: #5f5f5f;
        /* -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: #898989; */
    span {
        /* text-shadow: 0 0 3px #ff0000, 0 0 5px #0000ff; */
        /* border: solid 0.1em black; */
    }
    /* }  */
`;

const TitleSecondaryElement = styled.div`
    padding-top: 0.6em;
    /* font-size: 1.5rem; */
    font-weight: 300;
    margin-top: -0.5em;
    line-height: 3ch;
    max-width: 20em;

    color: ${(props) => props.theme.text};
    span {
        color: ${(props) => props.theme.neutral3};
        font-weight: 500;
    }
`;

const HeroButton = styled.button`
    width: 11em;
    height: 11em;
    background-color: black;
    cursor: pointer;
    border-radius: 100%;
    justify-self: end;
`;

const TitleParagraph = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: flex-end;
    text-align: right;
    gap: 0.5em;
    color: ${(props) => props.theme.neutral3};
    max-width: 25em;
    div {
        display: flex;
        gap: 1em;
        span {
            width: 8em;
            font-weight: 200;
            line-height: 2ch;
        }
    }
`;

export default function HeroSection() {
    // let HeroButtonTransofm = document.getElementById(
    //     "heroButton"
    // ) as HTMLButtonElement;
    // console.log(HeroButton);
    // for (let i = 1; i < HeroButton.length; i++) {
    //     HeroButton[i].style.transform = `rotate(${i}deg)`;
    // }

    return (
        <div
            style={{
                minHeight: "100vh",
                paddingTop: "4em",
                margin: "0 1.7em",
            }}
        >
            <Title>
                <TitleSecondaryElement>
                    It is not just a book store, it is a community that helps
                    you to get maximum benefits of crave for! Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Exercitationem magni
                    consequatur vero quod ab Lorem, sit amet consectetur
                    adipisicing elit.
                </TitleSecondaryElement>
                <TitleMainElement>
                    <div>Book</div>
                    Community <span>& Store</span>
                    {/* Focused Community On Your Cravings */}
                </TitleMainElement>
                <HeroButton>
                    <BsArrowUpRight color="#fff" />
                </HeroButton>
            </Title>
            <ImageContainer>
                <Image
                    src={MainPhoto}
                    alt="Main photo"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "right-center",
                    }}
                />
            </ImageContainer>
        </div>
    );
}
