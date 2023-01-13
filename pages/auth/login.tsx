import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/atoms/Button";
import { validateConfig } from "next/dist/server/config-shared";
import { signIn } from "next-auth/react";
import styled from "styled-components";

const LoginPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(0, -2.5em);
`;

const FormContainer = styled.div`
    padding: 1em;
    border-radius: 0.1em solid $primary-color;
`;

export default function () {
    let [useEmail, setUseEmail] = useState(false);
    // let [objectWithData, setObjectWithData] = useState({
    //     email: "this is a trial email",
    //     password: "helloWorld1234",
    // });

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [showPassword, setShowPassword] = useState(false);

    /* The POST method adds a new entry in the mongodb database. */
    const contentType = "application/json";

    const postData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": contentType,
                },
                body: JSON.stringify({ email, password }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                console.log("error");
                throw new Error();
            }
        } catch (error) {
            console.log(error);
        }
    };

    let onEmailChange = (e: any) => {
        if (e.target.value != "") {
            setShowPassword(true);
            setEmail(e.target.value);
        } else {
            setShowPassword(false);
        }
    };

    return (
        <LoginPage>
            <FormContainer>
                <Link href="/">
                    <BiBookBookmark fill="green" />
                </Link>
                <div>Welcome Back</div>
                <div>
                    <div>
                        <button
                            onClick={async () => {
                                await signIn("google", {
                                    redirect: false,
                                    callbackUrl: "/",
                                });
                            }}
                        >
                            <FcGoogle />
                            login with gmail
                        </button>
                        <button
                            onClick={async () => {
                                await signIn("facebook", {
                                    redirect: false,
                                    callbackUrl: "/",
                                });
                            }}
                        >
                            <GrFacebook />
                            login with facebook
                        </button>
                    </div>
                    <div>OR</div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            onChange={(e) => onEmailChange(e)}
                            value={email}
                        />
                    </div>
                    {showPassword && (
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    )}
                    <Button
                        approach="primary"
                        text="Log in"
                        onClick={async () => {
                            await signIn("credentials", {
                                redirect: false,
                                email,
                                password,
                                callbackUrl: "/",
                            });
                        }}
                        width="full"
                    />
                    <div>
                        Don't have an account?{" "}
                        <Link href="/auth/signup">Sign up</Link> now!
                    </div>
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">privacy</Link>
                    <Link href="/security">Security</Link>
                    <Link href="/contact">Contact Book Store</Link>
                </div>
            </FormContainer>
        </LoginPage>
    );
}
