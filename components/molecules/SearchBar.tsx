import Input from "../atoms/formElements/Input";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import styles from "./SearchBar.module.scss";

export default function (props: any) {
    return (
        <div className={styles.mainContainer}>
            <Input placeholder={props.placeholder} className={styles.input} />
            <Button Icon={FaSearch} type="primary" />
            {props.config && <Button type="tertiary" Icon={FaFilter} />}
        </div>
    );
}
