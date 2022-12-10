import Conatiner from "../components/molecules/Container";

export default {
    title: "Conatiner",
    component: Conatiner,
};

const Template: any = (args: any) => (
    <Conatiner {...args}>
        <p>content</p>
        <p>second tag</p>
    </Conatiner>
);

export const primary = Template.bind({});
primary.args = {
    title: "Title",
    position: "center",
    titleLevel: 1,
    // title: { value: "hello", position: "center" },
    // display: { value: "flex" },
    // indentation: "1",
};
