import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const Searchbar = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.neutral1};
    border: solid 0.05em ${(props) => props.theme.neutral2};
    align-items: center;
    padding: 0.7em;
    border-radius: 1.7em;
    max-width: 35em;
    margin: auto;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    transition: 500ms ease-in-out;
    color: ${(props) => props.theme.neutral3};
    &:focus {
        color: ${(props) => props.theme.text};
    }
    &[placeholder] {
        text-overflow: ellipsis;
        margin-right: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &::placeholder {
        color: ${(props) => props.theme.neutral3};
    }
`;

const NavButton = styled.div`
    background-color: transparent;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        text-decoration: underline;
    }
`;

export default function Community() {
    return (
        <main>
            <Searchbar>
                <Input type="text" placeholder="Search for people" />

                <NavButton>
                    <BsSearch />
                </NavButton>
            </Searchbar>
            <div>list of all registered people</div>
        </main>
    );
}
