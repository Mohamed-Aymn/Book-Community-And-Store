import SearchBar from "../components/molecules/SearchBar";

export default {
    title: "SearchBar",
    component: SearchBar,
};

const Template: any = (args: any) => <SearchBar {...args} />;

export const primary = Template.bind({});
primary.args = { placeholder: "hello" };
