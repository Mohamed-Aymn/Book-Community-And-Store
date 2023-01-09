import Navbar from "./Navbar";
import Footer from "./Footer";
import style from "./index.module.scss";
import { useRouter } from "next/router";
import {useSpring} from "react-spring";
import { useCallback } from "react";


export default function Layout({ children }: any) {
    const router = useRouter();

      //Animation
  const [topHeaderPosition, setTopHeaderPosition] = useSpring(() => ({
    position: "fixed",
    transform: "translate3d(0px, 0px, 0px)",
    immediate: true,
    borderBottom: "0px solid #ddd"
  }));

  const [textOpacity, setTextOpacity] = useSpring(() => ({
    opacity: 1
  }));

  const headerHeight = 200;
  const topHeaderHeight = 80;
  let lastScrollTop = 0;
  let accumScrollMovement = 0;
  const UP = 0;
  const DOWN = 1;
  let previousDirection = DOWN;
  let headerTopRevealed = false;


  const onScroll = useCallback((e) => {
    console.log(e.target.scrollTop);
    // eslint-disable-next-line no-unused-vars
    let currentDirection;
    const scrollDiff = e.target.scrollTop - lastScrollTop;

    if (e.target.scrollTop) {
      setTopHeaderPosition({
        borderBottom: "1px solid #ddd"
      });
    }

    if (e.target.scrollTop === 0) {
      setTextOpacity({
        opacity: 1
      });
    } else if (e.target.scrollTop > 0) {
      setTextOpacity({
        opacity: 0
      });
    }

    if (scrollDiff > 0) {
      console.log("going down");
      currentDirection = DOWN;
    } else {
      currentDirection = UP;
      console.log("going up");
      if (e.target.scrollTop > headerHeight) {
        if (previousDirection === DOWN) {
          accumScrollMovement = Math.abs(scrollDiff);
        }
        accumScrollMovement += Math.abs(scrollDiff);
        console.log({ accumScrollMovement });
        if (accumScrollMovement > 100) {
          setTopHeaderPosition({
            transform: "translate3d(0px, 0px 0px)",
            position: "fixed",
            immediate: false,
            borderBottom: "1px solid #ddd"
          });
          headerTopRevealed = true;
        }
      }
    }

    if (
      e.target.scrollTop > headerHeight - topHeaderHeight &&
      e.target.scrollTop <= headerHeight &&
      !headerTopRevealed &&
      currentDirection === UP
    ) {
      setTopHeaderPosition({
        position: "absolute",
        immediate: true,
        transform: "translate3d(0px, 0px, 0px)",
        borderBottom: "1px solid #ddd"
      });
    } else if (e.target.scrollTop > headerHeight && currentDirection === DOWN) {
      setTopHeaderPosition({
        position: "fixed",
        immediate: false,
        transform: "translate3d(0px, -100%, 0px)",
        borderBottom: "0px solid #ddd"
      });
      headerTopRevealed = false;
    } else if (e.target.scrollTop < headerHeight - topHeaderHeight) {
      setTopHeaderPosition({
        position: "fixed",
        immediate: true,
        transform: "translate3d(0px, 0px, 0px)",
        borderBottom: "0px solid #ddd"
      });
      headerTopRevealed = false;
    }

    lastScrollTop = e.target.scrollTop;
    previousDirection = currentDirection;
  }, []);


    return (
        <div className={style.layout}>
            {router.pathname.includes("/login") ||
            router.pathname.includes("/signup") ? null : (
                <Navbar />
            )}
            {children}
            {router.pathname.includes("/login") ||
            router.pathname.includes("/signup") ? null : (
                <Footer />
            )}
        </div>
    );
}
