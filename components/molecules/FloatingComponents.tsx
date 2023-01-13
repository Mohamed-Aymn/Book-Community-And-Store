import Button from "../atoms/Button";
import { MdDarkMode } from "react-icons/md";
import { layoutStore } from "../../clientState/layoutStore";

export default function () {
    const toggleTheme = layoutStore((state: any) => state.toggleTheme);
    const theme = layoutStore((state: any) => state.theme);
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    right: "30px",
                    bottom: "30px",
                }}
            >
                <Button
                    icon={<MdDarkMode />}
                    onClick={() => {
                        toggleTheme(theme);
                    }}
                />
            </div>
        </>
    );
}
