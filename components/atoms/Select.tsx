import styled from "styled-components";

// TODO: controlled components

interface ISelect {
    options: string[] | number[];
    setState: Function;
    state: string | number;
    name: string;
    hideFirstOption?: boolean;
}

const Container = styled.select<Partial<ISelect>>``;

export default function Select(props: ISelect) {
    let changeHandler = (e: any) => {
        props.setState(e.target.value);
    };
    return (
        <Container
            name={props.name}
            onChange={(e) => changeHandler(e)}
            value={props.state}
        >
            {props.hideFirstOption ? (
                <option value="" style={{ display: "none" }} />
            ) : null}
            {props.options.map((option: string | number, i: number) => {
                return (
                    <option value={option} key={i}>
                        {option}
                    </option>
                );
            })}
        </Container>
    );
}
