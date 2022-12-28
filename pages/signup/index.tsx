import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/molecules/Button";
import TagList from "../../components/molecules/TagList";

export default function () {
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
                    <h1 className="authTitle">Start your journey with us.</h1>
                    <div className="authInspiringText">
                        Discover the worlds's best comuunity of freelancers and
                        business owners.
                    </div>
                </div>
                <CustomersFeedback />
            </div>

            <div className="authFormContainer">
                <h1>Sign up</h1>

                <button>
                    <FcGoogle />
                    login with gmail
                </button>
                <button>
                    <GrFacebook />
                    login with facebook
                </button>
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
                <div>import your favourtie generes</div>
                <TagList list={["bla", "bla", "bla"]} />
                <Link href="/profile">
                    <Button type="primary" text="Create account" />
                </Link>
            </div>
        </div>
    );
}
