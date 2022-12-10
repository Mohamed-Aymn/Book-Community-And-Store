import styles from "./Reviews.module.scss";
import Image from "next/image";

export default function ({ img }: any) {
    return (
        <div className={styles.mainContainer}>
            <div>
                <Image className={styles.userImage} src={img} alt="userImage" />
                <div>User Name</div>
            </div>
            <div>
                <span>stars</span>
                <span>date</span>
            </div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus sapiente, repellat impedit dicta placeat at, eveniet
                saepe earum eaque fuga magni veritatis? Iure, beatae amet
                facilis a
            </div>
        </div>
    );
}
