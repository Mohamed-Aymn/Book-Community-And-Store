import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";

export default function () {
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
                <h1>Sign in </h1>
                {/* flex direction col */}
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
                    {/* all of these will be in a dynamic nested rout that will not appear without clicking or login with email, an notion experence */}
                    {/* <div>
                <div>user name</div>
                <Input />
            </div>
            <div>
                <div>pw</div>
                <Input />
            </div>
            <Button type="primary" text="Sign In" /> */}
                    <div>OR</div>
                    <div>
                        login with <Link href="#"> email</Link>
                    </div>
                    <div>
                        not regestered yet?{" "}
                        <Link href="/">create a new account</Link> now!
                    </div>
                </div>
            </div>
        </div>
    );
}
