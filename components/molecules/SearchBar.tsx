import Input from "../atoms/formElements/Input";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import styles from "./SearchBar.module.scss";

export default function (props: any) {
    return (
        <div className={styles.mainContainer}>
            <Input placeholder={props.placeholder} className={styles.input} />
            <Button Icon={FaSearch} type="primary" />
            {props.config === "true" ? (
                <Button type="primary" Icon={GoSettings} />
            ) : null}
        </div>
    );
}
