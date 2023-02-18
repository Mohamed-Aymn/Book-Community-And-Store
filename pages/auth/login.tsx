import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/atoms/Button";
import { signIn } from "next-auth/react";
import * as styles from "../../styles/Loginstyles";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import FormItem from "../../components/molecules/FormItem";
import Input from "../../components/atoms/Input";
import Logo from "../../assets/Logo";
import { Transition } from "react-transition-group";

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
        <styles.LoginPage>
            <styles.FormContainer>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "1em",
                    }}
                >
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Logo display="icon" />
                    </Link>
                    <div>Welcome Back !!</div>
                </div>
                <styles.BodyContainer>
                    <styles.OAuthContainer>
                        <styles.OAuthButton
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
                        </styles.OAuthButton>
                        <styles.OAuthButton
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
                        </styles.OAuthButton>
                    </styles.OAuthContainer>
                    <div style={{ textAlign: "center" }}>OR</div>
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
                    <Transition in={email !== ""} timeout={300} unmountOnExit>
                        {(state) => (
                            <styles.PasswordField TransitionState={state}>
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
                                        render={({
                                            field: { onChange, onBlur },
                                        }) => (
                                            <Input
                                                type="password"
                                                reactHookForm={{
                                                    onBlur,
                                                    onChange,
                                                }}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </styles.PasswordField>
                        )}
                    </Transition>
                    <Button
                        approach="primary"
                        text="Log in"
                        onClick={handleSubmit(loginUser)}
                        width="full"
                    />
                    <div style={{ textAlign: "right" }}>
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup">Sign up</Link> now!
                    </div>
                    <div style={{ display: "flex", gap: "0.5em" }}>
                        <Link href="/terms">Terms</Link>
                        <Link href="/privacy">privacy</Link>
                        <Link href="/security">Security</Link>
                        <Link href="/contact">Contact Book Store</Link>
                    </div>
                </styles.BodyContainer>
            </styles.FormContainer>
        </styles.LoginPage>
    );
}
