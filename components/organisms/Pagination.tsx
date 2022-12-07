import Button from "../molecules/Button";
import Container from "../molecules/Container";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function () {
    return (
        <Container display="flex" gap="big">
            <Button Icon={MdOutlineNavigateBefore} type="primary" />

            <Button text="1" type="primary" />
            <Button text="2" type="primary" />
            <Button text="3" type="primary" />
            <Button text="..." type="primary" />

            <Button Icon={MdOutlineNavigateNext} type="primary" />
        </Container>
    );
}
