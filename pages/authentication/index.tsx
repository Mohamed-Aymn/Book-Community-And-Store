import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";

export default function () {
    let [useEmail, setUseEmail] = useState(false);
    // let [objectWithData, setObjectWithData] = useState({
    //     email: "this is a trial email",
    //     password: "helloWorld1234",
    // });

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    /* The POST method adds a new entry in the mongodb database. */
    const contentType = "application/json";

    const postData = async () => {
        console.log("hello");
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

    return (
        <div className="mainAuthContainer">
            <div className="textCard">
                <div>
                    <Link href="/about">
                        <BiBookBookmark fill="#fff" />
                    </Link>
                    <h1 className="authTitle">Welcome back.</h1>
                    {/* <h1>Start your journey with us.</h1> */}
                    <div className="authInspiringText">
                        Discover the worlds's best comuunity of freelancers and
                        business owners.
                    </div>
                </div>
                <CustomersFeedback />
            </div>

            <div className="authFormContainer">
                <h1>Sign up</h1>

                {/* aweful logic handling */}
                {!useEmail && (
                    <div className="authFormContent">
                        <div className="signinButtons">
                            <button>
                                <FcGoogle />
                                sign in with gmail
                            </button>
                            <button>
                                <GrFacebook />
                                sign in with facebook
                            </button>
                        </div>
                        <div>OR</div>
                        <button onClick={() => setUseEmail(true)}>
                            login with <Link href="#"> email</Link>
                        </button>
                        <div>
                            not regestered yet?{" "}
                            <Link href="/">create a new account</Link> now!
                        </div>
                    </div>
                )}
                {useEmail && (
                    <>
                        <div>
                            <div>email</div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>password</div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => {
                                postData();
                            }}
                        >
                            sign up
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
