import { useEffect, useState } from "react";

export default function useScreenWidth() {
    const [width, setWidth] = useState<number>();
    const updateMedia = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return width as number;
}
