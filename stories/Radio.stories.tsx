import RadioButton from "../components/atoms/formElements/RadioButton";

export default {
    title: "RadioButton",
    component: RadioButton,
};

const Template: any = (args: any) => <RadioButton {...args} />;

export const primary = Template.bind({});
primary.args = {
    text: "Primary",
    type: "primary",
};
