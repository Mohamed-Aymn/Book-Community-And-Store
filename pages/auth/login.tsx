import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/atoms/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import FormItem from "../../components/molecules/FormItem";
import Input from "../../components/atoms/Input";
import Logo from "../../assets/Logo";
import { Transition, TransitionStatus } from "react-transition-group";
import Box from "../../components/atoms/Box";
import styled, { useTheme } from "styled-components";
import NextLink from "../../components/atoms/NextLink";

export const OAuthButton = styled.button<{
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
    const theme = useTheme();

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
        <Box
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                p={theme.space.md}
                border="0.1em solid"
                borderColor={theme.colors.neutral2}
                transition="300ms ease-in-out"
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="baseline"
                    mb={theme.space.md}
                >
                    <NextLink href="/">
                        <Logo display="icon" />
                    </NextLink>
                    <div>Welcome Back !!</div>
                </Box>

                <Box
                    display="flex"
                    flexGap={theme.space.xs}
                    flexDirection="column"
                    maxHeight="fit-content"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexGap={theme.space.sm}
                        position="relative"
                        alignContent="center"
                    >
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
                    </Box>
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
                        {(state: TransitionStatus) => (
                            <Box
                                transition="300ms ease-in-out"
                                opacity={
                                    state === "entering" || state === "entered"
                                        ? "1"
                                        : "0"
                                }
                                transform={
                                    state === "entering" || state === "entered"
                                        ? "translateY(0em)"
                                        : "translateY(-0.5em)"
                                }
                            >
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
                            </Box>
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
                </Box>
            </Box>
        </Box>
    );
}
