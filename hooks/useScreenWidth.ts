import { useEffect, useState } from "react";

export default function useScreenWidth() {
    const [width, setWidth] = useState<number>(0);
    const updateMedia = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return width;
}
