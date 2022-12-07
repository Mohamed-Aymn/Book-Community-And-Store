import Select from "../components/atoms/formElements/Select";

export default {
    title: "Select",
    component: Select,
};

const Template: any = (args: any) => <Select {...args} />;

export const primary = Template.bind({});
primary.args = {
    options: ["first", "second", "third"],
};
