import BookCard from "../components/organisms/BookCard";
import LandingConatiner from "../components/organisms/LandingContainer";
import mainPhoto from "../assets/mainPhoto.jpg";
import CustomersFeedback from "../components/organisms/CustomersFeedback";
import Button from "../components/molecules/Button";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import Link from "next/link";
import { useQuery, dehydrate, QueryClient } from "react-query";

let getFreeBooks = async () => {
    return fetch("http://localhost:3000/api/books?random=free-ebooks").then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};
let getEbooks = async () => {
    return fetch("http://localhost:3000/api/books?random=ebooks").then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery("free-books", getFreeBooks);
    await queryClient.prefetchQuery("E-books", getEbooks);

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}

export default function Home() {
    const { data: freeBooksData } = useQuery("free-books", getFreeBooks, {
        staleTime: 60 * 1000,
    });
    const { data: ebooksData } = useQuery("E-books", getEbooks, {
        staleTime: 60 * 1000,
    });

    return (
        <>
            <LandingConatiner />
            <main>
                <section className="section">
                    <div className="sectionHeader">
                        <h1 className="title">E-Books</h1>
                        <div className="sliderControllers">
                            <Link href="/store" className="linkButton">
                                <Button text="View All" type="primary" />
                            </Link>
                            <Button
                                Icon={MdOutlineNavigateBefore}
                                type="primary"
                                click={() => {
                                    let slider =
                                        document.getElementById("eBooksSlider");
                                    slider.scrollBy(-175, 0);
                                }}
                            />
                            <Button
                                Icon={MdOutlineNavigateNext}
                                type="primary"
                                click={() => {
                                    let slider =
                                        document.getElementById("eBooksSlider");
                                    slider.scrollBy(175, 0);
                                }}
                            />
                        </div>
                    </div>
                    <div className="homeSlider" id="eBooksSlider">
                        {ebooksData &&
                            ebooksData.map((book: any, i: number) => {
                                return (
                                    <BookCard
                                        key={i}
                                        title={book.volumeInfo.title}
                                        author={book.volumeInfo.authors}
                                        price={"99"}
                                        img={
                                            book.volumeInfo.imageLinks
                                                ?.thumbnail || mainPhoto
                                        }
                                    />
                                );
                            })}
                    </div>
                </section>

                <section className="section">
                    <div className="sectionHeader">
                        <h1 className="title">Free-Books</h1>
                        <div className="sliderControllers">
                            <Link href="/store">
                                <Button text="View All" type="primary" />
                            </Link>
                            <Button
                                Icon={MdOutlineNavigateBefore}
                                type="primary"
                                click={() => {
                                    let slider =
                                        document.getElementById(
                                            "freeBooksSlider"
                                        );
                                    slider.scrollBy(-175, 0);
                                }}
                            />
                            <Button
                                Icon={MdOutlineNavigateNext}
                                type="primary"
                                click={() => {
                                    let slider =
                                        document.getElementById(
                                            "freeBooksSlider"
                                        );
                                    slider.scrollBy(175, 0);
                                }}
                            />
                        </div>
                    </div>
                    <div className="homeSlider" id="freeBooksSlider">
                        {freeBooksData &&
                            freeBooksData.map((book: any, i: number) => {
                                return (
                                    <BookCard
                                        key={i}
                                        title={book.volumeInfo.title}
                                        author={book.volumeInfo.authors}
                                        price={"99"}
                                        img={
                                            book.volumeInfo.imageLinks.thumbnail
                                        }
                                    />
                                );
                            })}
                    </div>
                </section>

                <section className="section feedbackSection">
                    <h1 className="title">Our Customers</h1>
                    <div className="FeedbackContainer">
                        <CustomersFeedback
                            img={mainPhoto}
                            name="Auston Nichola"
                        />
                        <CustomersFeedback
                            img={mainPhoto}
                            name="Agatha Christie"
                        />
                        <CustomersFeedback
                            img={mainPhoto}
                            name="Houston Rickie"
                        />
                    </div>
                    <button className="joinus">Join Us</button>
                    {/* <Button text="join us" type="primary" /> */}
                </section>
            </main>
        </>
    );
}
