import Pagination from "../components/organisms/Pagination";

export default {
    title: "Pagination",
    component: Pagination,
};

const Template: any = (args: any) => <Pagination {...args} />;

export const primary = Template.bind({});
primary.args = {
    placeholder: "Search by book name",
    config: true,
};
