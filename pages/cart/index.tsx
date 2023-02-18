import Button from "../../components/atoms/Button";
import { Table, Th, Tr, Td, Tbody, Thead } from "../../components/atoms/Table";
import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { mediaQueryMax } from "../../styles/mediaQuery";
import Divider from "../../components/atoms/Divider";

const OrderDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BookName = styled(Td)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;

const CheckoutButtonContainer = styled.div`
    margin: 1em 0 1em 50em;
    ${mediaQueryMax("smallDesktop")`
        margin: 1em 0;
    `};
`;

const TotalPrice = styled.div`
    font-size: 2.5rem;
`;

export default function Cart() {
    return (
        <main>
            <Table>
                <Thead>
                    <Tr>
                        <Th>product</Th>
                        <Th>price</Th>
                        <Th>count</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <BookName>book name</BookName>
                        <Td>99</Td>
                        <Td>3</Td>
                        <Td
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5em",
                            }}
                        >
                            <Button approach="secondary" text="+" />
                            <Button approach="secondary" text="-" />
                            <Button
                                approach="danger"
                                icon={<BsFillTrashFill />}
                            />
                        </Td>
                    </Tr>
                </Tbody>
            </Table>

            <Divider />

            <OrderDetails>
                <div>
                    <div>Order summary</div>
                    <div>Sub-total : X</div>
                    <div>Shipping : x</div>
                </div>

                <TotalPrice>Total: x</TotalPrice>
            </OrderDetails>
            <CheckoutButtonContainer>
                <Button
                    text="Checkout"
                    width="full"
                    size="big"
                    approach="primary"
                />
            </CheckoutButtonContainer>
        </main>
    );
}
