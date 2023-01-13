import {
    useSpring,
    useTransition,
    animated,
    Controller,
    useChain,
    useSpringRef,
} from "@react-spring/web";
import { useState } from "react";
import Button from "./Button";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function MyComponent() {
    let [hello, setHello] = useState(true);
    let [isShowing, setIsShoiwng] = useState(false);

    // last to should be as same as from to end form the start point in the repetitve animation
    const springs = useSpring({
        from: { background: "#a3a3a3", y: -0, x: 0 },
        to: async (next, cancel) => {
            let i = 0;
            while (hello) {
                await next({ x: 80, background: "#fff59a" });
                await next({ y: 40, background: "#88DFAB" });
                await next({ x: 0, background: "#569AFF" });
                await next({ y: 0, background: "#ff6d6d" });
                i++;
            }
        },
        config: {
            mass: 2.3,
            friction: 26,
            tension: 170,
        },
    });

    // to: [{ x: "2em" }, { x: "0em" }],
    const styles = useSpring({
        from: { x: "0em" },
        to: async (next, cancel) => {
            while (true) {
                await next({ x: "2em" });
                await next({ x: "0em" });
            }
        },
    });

    const AnimatedButton = animated(Button);

    const ThirdTrial = animated(Button);

    const thirdApi = useSpringRef();
    const [third, api] = useSpring(() => ({
        ref: thirdApi,
        x: "0em",
        config: {
            mass: 5,
            friction: 120,
            tension: 120,
        },
    }));
    let [isOpen, setIsOpen] = useState(true);

    const FourthButton = animated(Button);

    const transApi = useSpringRef();
    const transition = useTransition(isOpen, {
        ref: transApi,
        from: {
            scale: 0,
            opacity: 0,
        },
        enter: {
            scale: 1,
            opacity: 1,
        },
        leave: {
            scale: 0,
            opacity: 0,
        },
    });

    const transApi2 = useSpringRef();
    const transition2 = useTransition(isOpen, {
        ref: transApi2,
        from: {
            scale: 0,
            opacity: 0,
        },
        enter: {
            scale: 3,
            opacity: 1,
        },
        leave: {
            scale: 0,
            opacity: 0,
        },
    });

    useChain(
        isOpen ? [transApi, transApi2] : [transApi2, transApi],
        // delay before first and second animation
        [1, isOpen ? 3 : 2]
    );

    return (
        <>
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                toogle
            </button>
            <hr />
            <br></br>
            {transition2((style, isOpen) => {
                return (
                    <>
                        {isOpen ? (
                            <FourthButton
                                style={{
                                    opacity: style.opacity,
                                    scale: style.scale,
                                }}
                                text="fourth"
                                approach="primary"
                            />
                        ) : null}
                    </>
                );
            })}
            {transition((style, isOpen) => {
                return (
                    <>
                        {isOpen ? (
                            <FourthButton
                                style={{
                                    opacity: style.opacity,
                                    scale: style.scale,
                                }}
                                text="fourth"
                                approach="primary"
                            />
                        ) : null}
                    </>
                );
            })}

            <button
                onClick={() => {
                    api.start({
                        x: "2em",
                    });
                }}
            >
                exit
            </button>
            <button
                onClick={() => {
                    api.start({ x: "0em" });
                }}
            >
                back again
            </button>
            <ThirdTrial
                style={third}
                text="iam catchy button"
                approach="catchy"
            />
            <button onClick={() => setHello(!hello)}>switch</button>
            <AnimatedButton style={styles} text="hello" approach="primary" />
            <animated.div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    ...springs,
                }}
            />
        </>
    );
}
