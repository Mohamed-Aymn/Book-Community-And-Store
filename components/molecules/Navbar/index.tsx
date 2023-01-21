import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mediaQueryMax } from "../../../styles/mediaQuery";
import { layoutStore } from "../../../clientState/layoutStore";
import AuthButtons from "./AuthButtons";
import { Route } from "./styles";
import NavSearchBar from "./NavSearch";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../../atoms/Button";
import { FcSettings } from "react-icons/fc";
import Divider from "../../atoms/Divider";

const RoutesAndNavSearchContainer = styled.div`
    display: flex;
    gap: 4em;
    width: 100%;
    /* justify-content: flex-end; */
`;

const RoutesContainer = styled.div`
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
    display: flex;
    align-items: center;
    margin: 0 auto;
    gap: 1em;
    width: fit-content;
`;

const Nav = styled.nav`
    position: fixed;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    gap: 2em;
    width: 100%;
    height: 5em;
    translate: 0 -1em;
    padding: 0 1.7em;
    padding-top: 1em;
    background-color: ${(props) => props.theme.body};
    z-index: 2;
`;

export default function Navbar() {
    let router = useRouter();
    const theme = layoutStore((state: any) => state.theme);

    // useEffect(() => {
    //     async () => {
    //         await setSearchResult(data);
    //         console.log(searchResult);
    //     };
    // }, [data]);

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
                {/* logo */}
                <Link href="/">
                    <BiBookBookmark
                        fill={theme === "light" ? "#000" : "#fff"}
                    />
                </Link>

                <RoutesAndNavSearchContainer>
                    <RoutesContainer>
                        <Link href="/" style={{ textDecoration: "none" }}>
                            <Route active={router.pathname === "/"}>Home</Route>
                        </Link>
                        <Link href="/store" style={{ textDecoration: "none" }}>
                            <Route active={router.pathname.includes("/store")}>
                                Store
                            </Route>
                        </Link>
                        {/* <Link
                            href="/profile"
                            style={{ textDecoration: "none" }}
                        >
                            <Route
                                active={router.pathname.includes("/profile")}
                            >
                                Profile
                            </Route>
                        </Link> */}
                        {/* <Link href="/cart" style={{ textDecoration: "none" }}>
                            <Route active={router.pathname.includes("/cart")}>
                                Cart
                            </Route>
                        </Link> */}
                        <Link
                            href="/aboutus"
                            style={{ textDecoration: "none" }}
                        >
                            <Route
                                active={router.pathname.includes("/aboutus")}
                            >
                                About us
                            </Route>
                        </Link>
                    </RoutesContainer>

                    <NavSearchBar />
                </RoutesAndNavSearchContainer>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0",
                            marginRight: "2em",
                        }}
                    >
                        <Button
                            approach="tertiary"
                            text="Settings"
                            icon={<FcSettings />}
                        />
                        <Button
                            approach="tertiary"
                            text="cart"
                            icon={<AiOutlineShoppingCart />}
                        />
                    </div>
                    <Divider orientation="vertical" verticalHeight="30" />

                    <AuthButtons />
                </div>
            </Nav>
        </>
    );
}
