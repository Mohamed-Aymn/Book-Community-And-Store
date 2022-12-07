import Container from "../molecules/Container";
import Image from "next/image";
import mainPhoto from "../../assets/mainPhoto.jpg";
import styles from "./BookCard.module.scss";

export default function ({ image, title, anotherInfo, click }: any) {
    return (
        <button onClick={click}>
            <div className={styles.photoContainer}>
                <Image
                    className={styles.image}
                    src={mainPhoto}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <Container title={title} margin="" titleposition="left">
                <div>{anotherInfo}</div>
            </Container>
        </button>
    );
}
