import { useState, useEffect } from "react";
/*
this hook provides isScrollingup or down state
and
Yoffset value
TODO: preformace optimization
control threshold from the function that is using the hook
ref: https://stackoverflow.com/questions/62497110/detect-scroll-direction-in-react-js
*/

export default function useVirticalScrollDirection() {
    const [vScrollDir, setVScrollDir] = useState<
        "scrolling down" | "scrolling up"
    >("scrolling down");
    let [yOffset, setYOffset] = useState(0);
    const onScroll = () => {
        setYOffset(window.pageYOffset);
    };
    useEffect(() => {
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const threshold = 10;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setVScrollDir(
                scrollY > lastScrollY ? "scrolling down" : "scrolling up"
            );
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);
        // console.log(scrollDir);

        return () => window.removeEventListener("scroll", onScroll);
    }, [vScrollDir]);
    return { vScrollDir, yOffset };
}
