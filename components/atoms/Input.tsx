import { closeSync } from "fs";
import { useController } from "react-hook-form";
import styled from "styled-components";

const Item = styled.input`
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

interface IInput {
    state?: string | number;
    setState?: Function;
    placeholder?: string;
    reactHookForm?: any;
    type?: "email" | "password" | "text";
}

export default function Input(props: IInput) {
    let changeHandler = (e: any) => {
        props.setState ? props.setState(e.target.value) : null;
    };

    return (
        <Item
            type={props.type || "text"}
            value={props.state ? props.state : undefined}
            onChange={(e) => {
                changeHandler(e);
                props.reactHookForm ? props.reactHookForm.onChange(e) : null;
            }}
            // onBlur={(e) => {
            //     props.reactHookForm.onBlur
            //         ? props.reactHookForm.onBlur(e)
            //         : null;
            // }}
            placeholder={props.placeholder}
        />
    );
}
