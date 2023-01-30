import styled from "styled-components";

interface IFormItem {
    type?: "text" | "radio" | "textBox" | "select" | "switch";
    placeholder?: string;
    children: React.ReactNode;
    label: string;
    labelPosition?: "beside" | "above";
    isError?: boolean;
    errorMessage?: any;
}

const Container = styled.label<IFormItem>`
    display: flex;

    ${(props) =>
        props.labelPosition == "beside"
            ? `
        flex-direction: row;
        gap: 0.5em;

        // justifiy-content: flex-end;
        `
            : `        
        flex-direction: column;
        gap: 0.1em;
        `}
    span {
        font-weight: bold;
    }
`;

export default function FormItem(props: IFormItem) {
    return (
        <Container
            label={props.label}
            labelPosition={props.labelPosition || "beside"}
        >
            <span>{props.label}:</span>
            {props.children}
            {props.isError && <span>{props.errorMessage}</span>}
        </Container>
    );
}
