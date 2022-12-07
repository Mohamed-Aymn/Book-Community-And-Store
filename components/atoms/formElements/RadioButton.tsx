import styles from "./RadioButton.module.scss";

export default function () {
    return (
        <div className={styles.radioButtonContainer}>
            <input type="radio" className={styles.radioItemInput} />
            <div className={styles.radioItemLabel} />
        </div>
    );
}
