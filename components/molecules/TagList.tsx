import styled from "styled-components";
import Button from "../atoms/Button";
// import styles from "./TagList.module.scss";

interface ITagList {
    wrap?: boolean;
    list?: any;
}

// i need to use gestures package here to scroll tags without navbar
const Conatiner = styled.div<ITagList>`
    display: flex;
    gap: 0.5em;
    max-width: 100%;
    padding: 0.1em;
    overflow-x: scroll;
    scrollbar-width: none;
    ${(props) => (props.wrap ? "flex-wrap: wrap;" : "")} // overflow-x: scroll;
        &::-webkit-scrollbar {
        display: none;
    }
`;

export default function TagList(props: ITagList) {
    return (
        <Conatiner wrap={props.wrap}>
            {props.list.map((item: string, i: number) => {
                return <Button key={i} text={item} approach="tag" />;
            })}
        </Conatiner>
    );
}
