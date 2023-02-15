import Image from "next/image";
import P from "../../atoms/Paragraph";
import Stars from "../../atoms/Stars";
import * as feedbackStyles from "./styles";
export default function CustomersFeedback({
    img,
    name,
}: {
    img: any;
    name: string;
}) {
    return (
        <feedbackStyles.Container>
            <Stars stars={5} />
            <P>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus sapiente, repellat impedit dicta placeat at, eveniet
            </P>
            <feedbackStyles.CustomerInfo>
                <feedbackStyles.ImageContainer>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "100%",
                        }}
                        width={500}
                        height={500}
                        src={img}
                        alt="userImage"
                    />
                </feedbackStyles.ImageContainer>
                <div style={{ alignSelf: "flex-end" }}>
                    <feedbackStyles.UserName>{name}</feedbackStyles.UserName>
                    <feedbackStyles.UserTitle>Writer</feedbackStyles.UserTitle>
                </div>
            </feedbackStyles.CustomerInfo>
        </feedbackStyles.Container>
    );
}
