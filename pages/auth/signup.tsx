import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import Button from "../../components/atoms/Button";
import { signIn } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";
import mainPhoto from "../../assets/mainPhoto.jpg";
import Divider from "../../components/atoms/Divider";
import FormItem from "../../components/molecules/FormItem";
import Input from "../../components/atoms/Input";
import { useForm, Controller } from "react-hook-form";
import { env } from "../../environment";

const InspiringCardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${(props) => props.theme.neutral2};
    height: 100vh;
    padding: 2em;
    /* width: 50%; */
`;

const InspiringTitle = styled.h1`
    color: ${(props) => props.theme.secondaryText};
`;

const InspiringText = styled.p`
    color: ${(props) => props.theme.secondaryText};
    font-weight: 100;
`;

const FormContainer = styled.div`
    margin: auto;
    width: 20em;
    /* height: 23em; */
`;

const Title = styled.div`
    font-size: 3.7rem;
    margin-left: -0.07em;
    font-weight: 800;
    color: ${(props) => props.theme.text};
    line-height: 1.5ch;
    margin-bottom: 0.5em;
    div {
        font-weight: 800;
        font-size: 3.5rem;
        line-height: 1.6ch;
        color: transparent;
        -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: ${(props) => props.theme.text};
    }
    span {
        display: block;
    }
`;

const InspiringCard = styled.div`
    padding: 1.5em;
    background-color: ${(props) => props.theme.neutral3};
    /* margin: auto; */
    /* height: 25em; */
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

export default function Signup() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({});

    const signUp = async (data: any) => {
        const { name, email, password, password2 } = data;

        try {
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
            router.push(`/${data.data._id}/settings`);
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "0.75fr 1fr" }}>
            <InspiringCardContainer>
                <InspiringCard>
                    <Title>
                        <div>Book</div>
                        Community <span>& Store</span>
                    </Title>
                    <InspiringTitle></InspiringTitle>
                    <InspiringText>
                        <b>Start your journey with us,</b> Discover the
                        worlds&apos;s best comuunity of freelancers and business
                        owners.
                    </InspiringText>
                </InspiringCard>
                <CustomersFeedback img={mainPhoto} name="Agatha Christie" />
            </InspiringCardContainer>

            <FormContainer>
                <h1>Sign up</h1>

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

                {/* OR */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Divider />
                    <div>OR</div>
                    <Divider />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em",
                    }}
                >
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
                </div>

                <input type="hidden" />

                <Button
                    approach="primary"
                    text="Create account"
                    onClick={handleSubmit(signUp)}
                    width="full"
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
            </FormContainer>
        </div>
    );
}
