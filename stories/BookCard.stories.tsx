import BookCard from "../components/organisms/BookCard";

export default {
    title: "Book card",
    component: BookCard,
};

const Template: any = (args: any) => <BookCard {...args} />;

export const primary = Template.bind({});
primary.args = {
    title: "Rich Dad Poor Dad",
    price: Math.floor(Math.random() * 52) + 98,
    author: "robert kiyosaki",
    // img: "http://books.google.com/books/content?id=K7ypwAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
};
