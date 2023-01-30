import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getUserData from "../../query_Functions/getUserData";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import TextArea from "../../components/atoms/TextArea";
import FormItem from "../../components/molecules/FormItem";
import { env } from "../../environment";

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

export default function () {
    let router = useRouter();
    // console.log(router.asPath);
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({});
    const { data: session, status } = useSession();
    const { data, isFetching, refetch } = useQuery(
        ["user data", session?.user._id],
        async () => await getUserData(session?.user._id)
    );

    let onSubmit = async (formData: any) => {
        console.log(formData);
        // router.push(`/${data.name}`);

        const { name, title, bio } = formData;

        try {
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
        } catch (error) {
            console.log((error as Error).message);
        }
    };

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
                            defaultValue={data.name}
                            name="name"
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    reactHookForm={{ onBlur, onChange }}
                                    state={data.name}
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
                            defaultValue={data.title}
                            name="title"
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    reactHookForm={{ onBlur, onChange }}
                                    state={data.title}
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
                            defaultValue={data.bio}
                            name="bio"
                            render={({ field: { onChange, onBlur } }) => (
                                <TextArea
                                    reactHookForm={{ onBlur, onChange }}
                                    state={data.bio}
                                />
                            )}
                        />
                    </FormItem>
                    <Button
                        approach="primary"
                        onClick={handleSubmit(onSubmit)}
                        text="Save"
                    />
                </>
            )}
        </main>
    );
}
