import styled from "styled-components";

const Container = styled.textarea`
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
    state?: string | number;
    setState?: Function;
    placeholder?: string;
    reactHookForm?: any;
}

export default function TextArea(props: ITextArea) {
    let changeHandler = (e: any) => {
        props.setState ? props.setState(e.target.value) : null;
    };
    return (
        <Container
            value={props.state ? props.state : undefined}
            onChange={(e) => {
                changeHandler(e);
                props.reactHookForm ? props.reactHookForm.onChange(e) : null;
            }}
            placeholder={props.placeholder}
        />
    );
}
