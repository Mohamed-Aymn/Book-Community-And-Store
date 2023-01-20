import styled from "styled-components";

interface IFormItem {
    type?: "text" | "radio" | "textBox" | "select" | "switch";
    placeholder?: string;
    children: React.ReactNode;
    label: string;
    labelPosition?: "beside" | "above";
}

const FormItem = styled.label<IFormItem>`
    display: flex;
    ${(props) =>
        props.labelPosition == "beside"
            ? `
        flex-direction: row;
        `
            : `        
        flex-direction: column;
        `}
    gap: 0.5em;
    span {
        font-weight: bold;
    }
`;

export default function (props: IFormItem) {
    return (
        <FormItem
            label={props.label}
            labelPosition={props.labelPosition || "beside"}
        >
            <span>{props.label}:</span>
            {props.children}
        </FormItem>
    );
}
