import styles from "./Loading.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function () {
    return (
        <AiOutlineLoading3Quarters className={styles.loadingIcon} fill="#fff" />
    );
}
