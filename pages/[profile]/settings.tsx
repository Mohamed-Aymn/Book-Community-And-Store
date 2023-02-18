import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getUserData from "../../query_functions/getUserData";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import TextArea from "../../components/atoms/TextArea";
import FormItem from "../../components/molecules/FormItem";
import { env } from "../../environment";
import { useEffect, useRef, useState } from "react";

export async function getServerSideProps({ req }: any) {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        ["user data", session.user._id],
        async () => await getUserData(session.user._id)
    );
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            session,
        },
    };
}

export default function Settings() {
    let router = useRouter();
    const { data: session, status } = useSession();
    const { data, isFetching, refetch } = useQuery(
        ["user data", session?.user._id],
        async () => await getUserData(session?.user._id)
    );
    let [isLoading, setLoading] = useState(false);
    let [name, setName] = useState(data.name);
    let [title, setTitle] = useState(data.title);
    let [bio, setBio] = useState(data.bio);

    let onSubmit = async (formData: any) => {
        console.log(formData);
        const { name, title, bio } = formData;
        try {
            setLoading(true);
            const res = await fetch(
                `${env.BASE_URL}/api/users/${session?.user._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            let data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            router.push(`/${session?.user._id}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log((error as Error).message);
        }
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: name,
            title: title,
            bio: bio,
        },
    });

    return (
        <main>
            <h1>Profile settings</h1>
            {data && (
                <>
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
                            // defaultValue={data.name}
                            name="name"
                            render={({ field: { onChange, onBlur, ref } }) => (
                                <Input
                                    reactHookForm={{ onBlur, onChange }}
                                    state={name}
                                    setState={setName}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Title"
                        labelPosition="above"
                        isError={errors["title"] ? true : false}
                        errorMessage={errors["title"]?.message}
                    >
                        <Controller
                            control={control}
                            rules={{
                                required: "this field is requried",
                            }}
                            // defaultValue={data.title}
                            name="title"
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    reactHookForm={{ onBlur, onChange }}
                                    state={title}
                                    setState={setTitle}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem label="Bio" labelPosition="above">
                        <Controller
                            control={control}
                            // rules={{
                            //     required: "this field is requried",
                            // }}
                            // defaultValue={data.bio}
                            name="bio"
                            render={({ field: { onChange, onBlur } }) => (
                                <TextArea
                                    reactHookForm={{ onBlur, onChange }}
                                    state={bio}
                                    setState={setBio}
                                />
                            )}
                        />
                    </FormItem>
                    <Button
                        approach="primary"
                        onClick={handleSubmit(onSubmit)}
                        text="Save"
                        isLoading={isLoading}
                    />
                </>
            )}
        </main>
    );
}
