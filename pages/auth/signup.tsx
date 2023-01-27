import Link from "next/link";
import CustomersFeedback from "../../components/organisms/CustomersFeedback";
import { BiBookBookmark, BiRegistered } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useState } from "react";
import Button from "../../components/atoms/Button";
import { signIn } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { layoutStore } from "../../clientState/layoutStore";
import Divider from "../../components/atoms/Divider";
import FormItem from "../../components/molecules/FormItem";
import Input from "../../components/atoms/Input";
import { useForm, Controller } from "react-hook-form";

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
    width: 70%;
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
        /* color: #5f5f5f; */
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
    margin: auto;
    height: 25em;
`;

export default function () {
    const router = useRouter();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [password2, setPassword2] = useState("");

    // email regex
    // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g

    const signUp = async () => {
        try {
            if (password !== password2) {
                throw new Error("Password fields should be identical");
            }

            //  TODO: i need to add both backend and frontend validation (frontend validation is set according to messages recevied from backend)
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            let data = await res.json();

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
            router.push("/");
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({});

    const onSubmit = (data: any) => console.log(data);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.56fr 1fr" }}>
            <InspiringCardContainer>
                <InspiringCard>
                    {/* <Controller
                        as={Input}
                        name="FirstName"
                        control={control}
                        defaultValue=""
                    /> */}
                    {/* <Input control={control} /> */}
                    {/* <Controller
                        render={({ field }) => {
                            <input
                                // state={email}
                                // setState={setEmail}
                                {...field}
                            />;
                        }}
                        name="email"
                        defaultValue=""
                        control={control}
                    /> */}
                    {/* <Link href="/about">
                        <BiBookBookmark
                            fill={theme === "light" ? "#000" : "#fff"}
                        />
                    </Link> */}
                    <Title>
                        <div>Book</div>
                        Community <span>& Store</span>
                    </Title>
                    <InspiringTitle></InspiringTitle>
                    <InspiringText>
                        <b>Start your journey with us,</b> Discover the worlds's
                        best comuunity of freelancers and business owners.
                    </InspiringText>
                </InspiringCard>
                {/* <CustomersFeedback img={mainPhoto} name="Agatha Christie" /> */}
            </InspiringCardContainer>

            <FormContainer>
                <h1>Sign up</h1>

                <button
                    onClick={async () => {
                        await signIn("google", {
                            redirect: false,
                            callbackUrl: "/",
                        });
                    }}
                >
                    <FcGoogle />
                    Continue with gmail
                </button>
                <button
                    onClick={() => {
                        signIn("facebook", {
                            redirect: false,
                            callbackUrl: "/",
                        });
                    }}
                >
                    <GrFacebook />
                    Continue with facebook
                </button>

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
                    <button onClick={handleSubmit(onSubmit)}>clickme</button>

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
                                maxLength: 20,
                                minLength: 3,
                            }}
                            name="email"
                            render={({
                                field: { onChange, onBlur, value, name },
                            }) => (
                                <Input reactHookForm={{ onBlur, onChange }} />
                            )}
                        />
                    </FormItem>

                    <FormItem label="Password" labelPosition="above">
                        <Input state={password} setState={setPassword} />
                    </FormItem>

                    <FormItem label="Re-enter password" labelPosition="above">
                        <Input state={password2} setState={setPassword2} />
                    </FormItem>
                </div>

                <Button
                    approach="primary"
                    text="Create account"
                    onClick={signUp}
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
