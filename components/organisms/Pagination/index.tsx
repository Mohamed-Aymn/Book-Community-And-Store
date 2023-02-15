import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import styled from "styled-components";
import { PaginationButton } from "./privateMolecules/PaginationButton";
import { PaginationControllerButton } from "./privateMolecules/PaginationControllerButton";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Pagination(props: any) {
    let pageNumbers = [1, 2, 3];

    // for (
    //     let i = 1;
    //     i <= Math.ceil(props.totalItems / props.itemsPerPage);
    //     i++
    // ) {
    //     pageNumbers.push(i);
    // }

    return (
        <Container>
            <PaginationControllerButton icon={<MdOutlineNavigateBefore />} />

            {pageNumbers.map((number) => (
                <PaginationButton
                    key={number}
                    index={number}
                    onClick={async () => {
                        await props.setPage(number);
                        props.fetchFunction();
                    }}
                />
            ))}

            <PaginationControllerButton icon={<MdOutlineNavigateNext />} />
        </Container>
    );
}
