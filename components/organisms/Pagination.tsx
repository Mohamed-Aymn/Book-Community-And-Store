import Button from "../molecules/Button";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import styles from "./Pagination.module.scss";

export default function () {
    return (
        <div className={styles.mainConatiner}>
            <Button Icon={MdOutlineNavigateBefore} type="primary" />

            <div className={styles.pagesNumbers}>
                <Button text="1" type="primary" />
                <Button text="2" type="primary" />
                <Button text="3" type="primary" />
                <Button text="..." type="primary" />
            </div>

            <Button Icon={MdOutlineNavigateNext} type="primary" />
        </div>
    );
}
