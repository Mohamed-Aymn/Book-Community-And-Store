/*
type this in the documentation:-
--------------------------------

type (primary, secondary, danger,link)

text

icon (icon name)
    righticon (ture, false) left icons is set as default

isAccessible (disabled/enabled)

isLoading (true, flase)
*/
import styles from "./Button.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function (props: any) {
    let { type, text, Icon, iconposition, isaccessible, isloading } = props;

    return (
        <button className={styles.button} {...props}>
            <>
                {Icon && !isloading ? (
                    <Icon />
                ) : isloading ? (
                    <AiOutlineLoading3Quarters
                        className={styles.loadingIcon}
                        fill="#fff"
                    />
                ) : null}
            </>
            {text}
        </button>
    );
}
