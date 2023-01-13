import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mediaQueryMax } from "../../../styles/mediaQuery";
import { layoutStore } from "../../../clientState/layoutStore";
import AuthButtons from "./AuthButtons";
import { Route } from "./styles";

const RoutesContainer = styled.div`
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;

const Nav = styled.nav`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5em;
    translate: 0 -1em;
    padding: 0 1.7em;
    padding-top: 1em;
    background-color: ${(props) => props.theme.primary};
    z-index: 1em;
`;

export default function Navbar() {
    let router = useRouter();

    // let [offset, setOffset] = useState(0);
    // const onScroll = () => {
    //     setOffset(window.pageYOffset);
    // };
    // useEffect(() => {
    //     window.removeEventListener("scroll", onScroll);
    //     window.addEventListener("scroll", onScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", onScroll);
    // }, []);
    // if (offset >= 300) {
    //     navAnimationApi.start({
    //         y: "-4em",
    //     });
    // } else {
    //     navAnimationApi.start({
    //         y: "0em",
    //     });
    // }

    return (
        <>
            <Nav>
                {/* <Button approach="route" text="home" active={"condition"} screen={"mobile"} /> */}
                {/* logo */}
                <Link href="/" style={{ width: "10em" }}>
                    <BiBookBookmark fill="#fff" />
                </Link>

                {/* Routes */}
                <RoutesContainer>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname === "/"}>Home</Route>
                    </Link>
                    <Link href="/store" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname.includes("/store")}>
                            Store
                        </Route>
                    </Link>
                    <Link href="/profile" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname.includes("/profile")}>
                            Profile
                        </Route>
                    </Link>
                    <Link href="/cart" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname.includes("/cart")}>
                            Cart
                        </Route>
                    </Link>
                    <Link href="/aboutus" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname.includes("/aboutus")}>
                            About us
                        </Route>
                    </Link>
                </RoutesContainer>

                <AuthButtons />
            </Nav>
        </>
    );
}
