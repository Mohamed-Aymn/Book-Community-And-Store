import Button from "../molecules/Button";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import styles from "./Pagination.module.scss";

export default function (props: any) {
    let pageNumbers = [];

    for (
        let i = 1;
        i <= Math.ceil(props.totalItems / props.itemsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className={styles.mainConatiner}>
                <Button
                    icon={<MdOutlineNavigateBefore />}
                    type="primary"
                    text="prev"
                />

                {pageNumbers.map((number) => (
                    <Button
                        key={number}
                        text={number}
                        type="primary"
                        onClick={async () => {
                            await props.setPage(number);
                            props.fetchFunction();
                        }}
                    />
                ))}

                <Button
                    icon={<MdOutlineNavigateNext />}
                    type="primary"
                    text="next"
                />
            </div>
        </>
    );
}
