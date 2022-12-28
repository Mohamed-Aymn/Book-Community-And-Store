import Button from "../molecules/Button";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import styles from "./Pagination.module.scss";
import { useState } from "react";

export default function () {
    let [paginationDetails, setPaginationDetails] = useState(false);

    return (
        <>
            {paginationDetails && (
                <div className={styles.paginationDetailsPopup}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>5</div>
                    <div>5</div>
                    <div>5</div>
                    <div>5</div>
                    <div>5</div>
                    <div>5</div>
                    <div>5</div>
                    <input type="text" />
                </div>
            )}

            <div className={styles.mainConatiner}>
                <Button
                    icon={<MdOutlineNavigateBefore />}
                    type="primary"
                    text="prev"
                />
                <div className={styles.pagesNumbers}>
                    <Button text="1" type="primary" />
                    <Button
                        text="..."
                        type="primary"
                        onClick={() => {
                            setPaginationDetails(!paginationDetails);
                        }}
                    />
                    <Button text="7" type="primary" />
                    <Button text="8" type="primary" />
                    <Button text="9" type="primary" />
                    <Button
                        text="..."
                        type="primary"
                        onClick={() => {
                            setPaginationDetails(!paginationDetails);
                        }}
                    />
                    <Button text="109" type="primary" />
                </div>
                <Button
                    icon={<MdOutlineNavigateNext />}
                    type="primary"
                    text="next"
                />
            </div>
        </>
    );
}
