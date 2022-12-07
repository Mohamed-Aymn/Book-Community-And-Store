import Link from "next/link";
import Input from "../../components/atoms/formElements/Input";
import Button from "../../components/molecules/Button";
import Container from "../../components/molecules/Container";

export default function () {
    return (
        <main>
            <h1>Welcome back</h1>

            <div>log in with </div>
            {/* flex direction col */}
            <Container display="flex">
                <button> facebook</button>
                <button>gmail</button>
            </Container>

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

            <p>
                Or login with <Link href="#"> email</Link>
            </p>

            <p>
                not regestered yet,{" "}
                <Link href="/signup">create a new account</Link> now!
            </p>
        </main>
    );
}
