import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/molecules/Button";

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

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <Link href="/">
                    <BiBookBookmark fill="green" />
                </Link>
                <div>Welcome Back</div>
                <div className="authFormContent">
                    <div className="signinButtons">
                        <button>
                            <FcGoogle />
                            login with gmail
                        </button>
                        <button>
                            <GrFacebook />
                            login with facebook
                        </button>
                    </div>
                    <div>OR</div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            onChange={(e) =>
                                e.target.value != ""
                                    ? setShowPassword(true)
                                    : setShowPassword(false)
                            }
                        />
                    </div>
                    {showPassword && (
                        <div>
                            <label>Password</label>
                            <input type="password" />
                        </div>
                    )}
                    <Button type="primary" text="Log in" />
                    <div>
                        Don't have an account?{" "}
                        <Link href="/signup">Sign up</Link> now!
                    </div>
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">privacy</Link>
                    <Link href="/security">Security</Link>
                    <Link href="/contact">Contact Book Store</Link>
                </div>
            </div>
        </div>
    );
}
