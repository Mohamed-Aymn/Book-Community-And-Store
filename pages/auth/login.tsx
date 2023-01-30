import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/atoms/Button";
import { signIn } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import FormItem from "../../components/molecules/FormItem";
import Input from "../../components/atoms/Input";

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

const OAuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    position: relative;
    align-content: center;
    /* align-items: baseline; */
    /* justify-content: center; */
    /* align-items: baseline; */
`;

const OAuthButton = styled.button<{
    brandColor: string;
    logoBackgroundColor?: string;
}>`
    padding: 1em 2em;
    background-color: ${(props) => props.brandColor};
    border: none;
    outline: none;
    color: #fff;
    border-radius: 0.2em;
    cursor: pointer;
    span {
        position: absolute;
        left: 1em;
        top: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.logoBackgroundColor};
        padding: 0.2em;
    }
`;

export default function Login() {
    const router = useRouter();
    let [email, setEmail] = useState("");
    let [errorAlert, setErrorAlert] = useState("");

    const loginUser = async (data: any) => {
        const { email, password } = data;
        try {
            const res: any = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: `${window.location.origin}`,
            });

            if (res.error) throw new Error(res.error);

            router.push("/");
        } catch (error) {
            setErrorAlert((error as Error).message);
        }
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({});

    return (
        <LoginPage>
            <FormContainer>
                <Link href="/">
                    <BiBookBookmark fill="green" />
                </Link>
                <div>Welcome Back</div>
                <div>
                    <OAuthContainer>
                        <OAuthButton
                            brandColor="#517be9"
                            logoBackgroundColor="#fff"
                            onClick={async () => {
                                await signIn("google", {
                                    redirect: false,
                                    callbackUrl: "/",
                                });
                            }}
                        >
                            <span>
                                <FcGoogle />
                            </span>
                            Continue with gmail
                        </OAuthButton>
                        <OAuthButton
                            brandColor="#4962aa"
                            onClick={() => {
                                signIn("facebook", {
                                    redirect: false,
                                    callbackUrl: "/",
                                });
                            }}
                        >
                            <span>
                                <GrFacebook />
                            </span>
                            Continue with facebook
                        </OAuthButton>
                    </OAuthContainer>
                    <div>OR</div>
                    {errorAlert !== "" && <div>{errorAlert}</div>}
                    <FormItem
                        label="Email"
                        labelPosition="above"
                        isError={errors["email"] ? true : false}
                        errorMessage={errors["email"]?.message}
                    >
                        <Controller
                            control={control}
                            rules={{
                                required: "this field is requried",
                            }}
                            name="email"
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    state={email}
                                    setState={setEmail}
                                    type="email"
                                    reactHookForm={{ onBlur, onChange }}
                                />
                            )}
                        />
                    </FormItem>
                    {email && (
                        <FormItem
                            label="Password"
                            labelPosition="above"
                            isError={errors["password"] ? true : false}
                            errorMessage={errors["password"]?.message}
                        >
                            <Controller
                                control={control}
                                rules={{
                                    required: "this field is requried",
                                }}
                                name="password"
                                render={({ field: { onChange, onBlur } }) => (
                                    <Input
                                        type="password"
                                        reactHookForm={{ onBlur, onChange }}
                                    />
                                )}
                            />
                        </FormItem>
                    )}
                    <Button
                        approach="primary"
                        text="Log in"
                        onClick={handleSubmit(loginUser)}
                        width="full"
                    />
                    <div>
                        Don&apos;t have an account?{" "}
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
