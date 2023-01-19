import styled from "styled-components";

const Input = styled.input`
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
    state: string | number;
    setState: Function;
    placeholder?: string;
}

export default function (props: IInput) {
    let changeHandler = (e: any) => {
        props.setState(e.target.value);
    };
    return (
        <Input
            type="text"
            value={props.state}
            onChange={(e) => changeHandler(e)}
            placeholder={props.placeholder}
        />
    );
}
