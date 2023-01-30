import Button from "../../components/atoms/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import { Table, Th, Tr, Td } from "../../components/atoms/Table";
import styled from "styled-components";

const OrderDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ImageContainer = styled.div`
    width: 2em;
    height: 2.5em;
`;

export default function Cart() {
    return (
        <main>
            <Table>
                <thead>
                    <tr>
                        <Th>product</Th>
                        <Th>price</Th>
                        <Th>count</Th>
                    </tr>
                </thead>
                <tbody>
                    <Tr>
                        <Td>
                            <ImageContainer>
                                <Image
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "0.7em",
                                    }}
                                    src={img}
                                    alt="Product Image"
                                    width={500}
                                    height={500}
                                />
                            </ImageContainer>
                            book name
                        </Td>
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
                            <Button approach="danger" text="remove" />
                        </Td>
                    </Tr>
                </tbody>
            </Table>

            <OrderDetails>
                <div>
                    <div>Order summary</div>
                    <div>Sub-total : X</div>
                    <div>Shipping : x</div>
                </div>

                <div>
                    <div>Total: x</div>
                    <Button text="Checkout" approach="primary" />
                </div>
            </OrderDetails>
        </main>
    );
}
