import styled from "styled-components";
import useLayoutStore from "../../../client_state/useLayoutStore";
import FloatingButton from "./privateMolecules/FloatingButton";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { AiOutlineArrowUp } from "react-icons/ai";

const Container = styled.div`
    position: fixed;
    bottom: 1.7em;
    right: 1.7em;
    z-index: 5;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5em;
    isolation: isolate;
`;

export default function FloatingButtons() {
    const { toggleTheme, theme } = useLayoutStore();
    let [isUpArrow, setUpArrow] = useState(false);

    const onScroll = () => {
        setUpArrow(window.pageYOffset > 500);
    };
    useEffect(() => {
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <Container>
            <FloatingButton
                icon={
                    theme === "light" ? (
                        <MdDarkMode fill="#000" />
                    ) : (
                        <BsFillSunFill fill="#000" />
                    )
                }
                onClick={toggleTheme}
                order={1}
            />
            <Transition in={isUpArrow} timeout={500}>
                {(state) => (
                    <FloatingButton
                        icon={<AiOutlineArrowUp />}
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        order={2}
                    />
                )}
            </Transition>
        </Container>
    );
}
