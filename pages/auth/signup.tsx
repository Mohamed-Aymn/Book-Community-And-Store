import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/atoms/Button";
import TagList from "../../components/molecules/TagList";
import { signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";

const FormContainer = styled.div`
    padding: 2em;
    width: 100%;
`;

const InspiringCard = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${(props) => props.theme.primary};
    margin: 1em;
    height: calc(100vh - 2em);
    padding: 2em;
    width: 40%;
    border-radius: 1.7em;
`;

const InspiringTitle = styled.h1`
    color: ${(props) => props.theme.secondaryText};
`;

const InspiringText = styled.p`
    color: ${(props) => props.theme.secondaryText};
    font-weight: 100;
`;

export default function () {
    const router = useRouter();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let redirectToHome = () => {
        router.push("/");
    };

    /* The POST method adds a new entry in the mongodb database. */
    const contentType = "application/json";

    const signUp = async () => {
        try {
            //  TODO: i need to add both backend and frontend validation (frontend validation is set according to messages recevied from backend)
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": contentType,
                },
                body: JSON.stringify({ email, password }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error();
            }

            const authResponse: any = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: `${window.location.origin}`,
            });

            if (authResponse.error) throw new Error(authResponse.error);

            redirectToHome();
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <InspiringCard>
                <div>
                    <Link href="/about">
                        <BiBookBookmark fill="#fff" />
                    </Link>
                    <InspiringTitle>Start your journey with us.</InspiringTitle>
                    <InspiringText>
                        Discover the worlds's best comuunity of freelancers and
                        business owners.
                    </InspiringText>
                </div>
                <CustomersFeedback />
            </InspiringCard>

            <FormContainer>
                <h1>Sign up</h1>

                <button
                    onClick={async () => {
                        await signIn("google", {
                            redirect: false,
                            callbackUrl: "/",
                        });
                    }}
                >
                    <FcGoogle />
                    Continue with gmail
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
                    Continue with facebook
                </button>

                <div>OR</div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>re enter password</label>
                    <input type="password" />
                </div>

                <Button
                    approach="primary"
                    text="Create account"
                    onClick={signUp}
                />

                <div>
                    <span>have an account? </span>
                </div>
            </FormContainer>
        </div>
    );
}
