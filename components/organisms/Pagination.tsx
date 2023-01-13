import Button from "../atoms/Button";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import styled from "styled-components";

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.3em;
`;

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
        <Pagination>
            <Button
                icon={<MdOutlineNavigateBefore />}
                approach="primary"
                text="prev"
            />

            {pageNumbers.map((number) => (
                <Button
                    key={number}
                    approach="primary"
                    onClick={async () => {
                        await props.setPage(number);
                        props.fetchFunction();
                    }}
                />
            ))}

            <Button
                icon={<MdOutlineNavigateNext />}
                approach="primary"
                text="next"
            />
        </Pagination>
    );
}
