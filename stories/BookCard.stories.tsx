import BookCard from "../components/organisms/BookCard";
import mainPhoto from "../assets/mainPhoto.jpg";

export default {
    title: "Book card",
    component: BookCard,
};

const Template: any = (args: any) => <BookCard {...args} />;

export const primary = Template.bind({});
primary.args = {
    title: "Awesome Book",
    price: 50,
    info: "this is a great book",
    mainPhoto,
};
