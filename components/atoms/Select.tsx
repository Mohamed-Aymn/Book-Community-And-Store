import styled from "styled-components";

interface ISelect {
    options: string[] | number[];
    hideFirstOption?: boolean;
}

const Select = styled.select``;

export default function (props: ISelect) {
    return (
        <select>
            {props.hideFirstOption ? (
                <option value="" style={{ display: "none" }} />
            ) : null}
            {props.options.map((option: string | number) => {
                return <option value={option}>{option}</option>;
            })}
        </select>
    );
}
