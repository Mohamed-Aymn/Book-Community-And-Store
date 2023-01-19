import styled from "styled-components";

const TextArea = styled.textarea`
    background-color: transparent;
    border: solid 0.1em ${(props) => props.theme.tertiary};
    color: ${(props) => props.theme.secondaryText};
    outline: none;
    &:focus {
        border: solid 0.1em ${(props) => props.theme.primary};
        color: ${(props) => props.theme.primaryText};
    }
    &::placeholder {
        color: ${(props) => props.theme.tertiary};
    }
`;

interface ITextArea {
    state: string | number;
    setState: Function;
    placeholder?: string;
}

export default function (props: ITextArea) {
    let changeHandler = (e: any) => {
        props.setState(e.target.value);
    };
    return (
        <TextArea
            value={props.state}
            onChange={(e) => changeHandler(e)}
            placeholder={props.placeholder}
        />
    );
}
