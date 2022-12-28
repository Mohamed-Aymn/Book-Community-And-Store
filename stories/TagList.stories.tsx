import TagList from "../components/molecules/TagList";

export default {
    title: "TagList",
    component: TagList,
};

const Template: any = (args: any) => <TagList {...args} />;

export const primary = Template.bind({});
primary.args = {
    list: [
        "Horror",
        "SC-Fi",
        "Comdey",
        "Action",
        "Novel",
        "History",
        "Drama",
        "Poetry",
        "Adventure",
        "Romance",
        "Detective & Mystery",
        "Philosophy",
        "Religion",
        "something else",
    ],
};
