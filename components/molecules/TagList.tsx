import Button from "../atoms/Button";
import styles from "./TagList.module.scss";

export default function (props: any) {
    return (
        <div className={styles.container} wrap={"false"}>
            {props.list.map((item: string, i: number) => {
                return <Button key={i} text={item} approach="tag" />;
            })}
        </div>
    );
}
