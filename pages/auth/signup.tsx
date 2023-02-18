import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import Button from "../../components/atoms/Button";
import { signIn } from "next-auth/react";
import * as styles from "../../styles/SignupStyles";
import { useRouter } from "next/router";
import mainPhoto from "../../assets/mainPhoto.jpg";
import FormItem from "../../components/molecules/FormItem";
import Input from "../../components/atoms/Input";
import { useForm, Controller } from "react-hook-form";
import { env } from "../../environment";
import { useState } from "react";

export default function Signup() {
    let [isLoading, setLoading] = useState(false);

    const router = useRouter();
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({});

    const signUp = async (data: any) => {
        const { name, email, password, password2 } = data;

        try {
            setLoading(true);

            if (password !== password2) {
                throw new Error("Password fields should be identical");
            }

            const res = await fetch(`${env.BASE_URL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name }),
            });
            let data = await res.json();

            // console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            const authResponse: any = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: `${window.location.origin}`,
            });

            if (authResponse.error) throw new Error(authResponse.error);

            // TODO: instead of handling callbacks like that, handle it useing nextauth
            setLoading(false);
            router.push(`/${data.data._id}/settings`);
        } catch (error) {
            setLoading(false);
            console.log((error as Error).message);
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "0.75fr 1fr" }}>
            <styles.InspiringCardContainer>
                <styles.InspiringCard>
                    <styles.Title>
                        <div>Book</div>
                        Community <span>& Store</span>
                    </styles.Title>
                    <styles.InspiringTitle></styles.InspiringTitle>
                    <styles.InspiringText>
                        <b>Start your journey with us,</b> Discover the
                        worlds&apos;s best comuunity of freelancers and business
                        owners.
                    </styles.InspiringText>
                </styles.InspiringCard>
                <CustomersFeedback img={mainPhoto} name="Agatha Christie" />
            </styles.InspiringCardContainer>

            <styles.FormContainer>
                <h1>Sign up</h1>
                <div
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        flexDirection: "column",
                    }}
                >
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

                    {/* OR */}

                    <div style={{ textAlign: "center" }}>OR</div>

                    <FormItem
                        label="Name"
                        labelPosition="above"
                        isError={errors["name"] ? true : false}
                        errorMessage={errors["name"]?.message}
                    >
                        <Controller
                            control={control}
                            rules={{
                                required: "this field is requried",
                            }}
                            name="name"
                            render={({ field: { onChange, onBlur } }) => (
                                <Input reactHookForm={{ onBlur, onChange }} />
                            )}
                        />
                    </FormItem>
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
                                pattern: {
                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                    message: "Write a valid email",
                                },
                            }}
                            name="email"
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    reactHookForm={{ onBlur, onChange }}
                                    type="email"
                                />
                            )}
                        />
                    </FormItem>

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
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
                                    message:
                                        "Minimum eight characters, at least one letter and one number:",
                                },
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

                    <FormItem
                        label="Re-enter password"
                        labelPosition="above"
                        isError={errors["password2"] ? true : false}
                        errorMessage={errors["password2"]?.message}
                    >
                        <Controller
                            control={control}
                            rules={{
                                required: "this field is requried",
                                validate: (val: string) => {
                                    if (watch("password") != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            }}
                            name="password2"
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    reactHookForm={{ onBlur, onChange }}
                                    type="password"
                                />
                            )}
                        />
                    </FormItem>

                    <Button
                        approach="primary"
                        text="Create account"
                        onClick={handleSubmit(signUp)}
                        width="full"
                        isLoading={isLoading}
                    />

                    <Link href={"/auth/login"}>
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
                            have an account?
                        </div>
                    </Link>
                </div>
            </styles.FormContainer>
        </div>
    );
}
