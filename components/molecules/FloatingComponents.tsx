import Button from "../atoms/Button";
import { MdDarkMode } from "react-icons/md";
import { layoutStore } from "../../clientState/layoutStore";
import { BsFillSunFill } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function () {
    const toggleTheme = layoutStore((state: any) => state.toggleTheme);
    const theme = layoutStore((state: any) => state.theme);

    let [isUpArrow, setUpArrow] = useState(false);
    const onScroll = () => {
        setUpArrow(window.pageYOffset > 300);
    };
    useEffect(() => {
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {isUpArrow && (
                <div
                    style={{
                        position: "fixed",
                        right: "30px",
                        bottom: "70px",
                    }}
                >
                    <Button
                        approach="secondary"
                        icon={<AiOutlineArrowUp />}
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    />
                </div>
            )}

            <div
                style={{
                    position: "fixed",
                    right: "30px",
                    bottom: "30px",
                }}
            >
                <Button
                    approach="secondary"
                    icon={
                        theme === "light" ? <MdDarkMode /> : <BsFillSunFill />
                    }
                    onClick={() => {
                        toggleTheme(theme);
                    }}
                />
            </div>
        </>
    );
}
