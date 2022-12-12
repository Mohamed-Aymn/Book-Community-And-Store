import BookCard from "../components/organisms/BookCard";
import LandingConatiner from "../components/organisms/LandingContainer";
import mainPhoto from "../assets/mainPhoto.jpg";
import CustomersFeedback from "../components/organisms/CustomersFeedback";
import Button from "../components/molecules/Button";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import Link from "next/link";

export default function Home() {
    let books = [1, 2, 3, 4, 4, 5, 6, 7];

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
                                    slider.scrollBy(-100, 0);
                                }}
                            />
                            <Button
                                Icon={MdOutlineNavigateNext}
                                type="primary"
                                click={() => {
                                    let slider =
                                        document.getElementById("eBooksSlider");
                                    slider.scrollBy(100, 0);
                                }}
                            />
                        </div>
                    </div>
                    <div className="homeSlider" id="eBooksSlider">
                        {books.map((book: number, i: number) => {
                            return (
                                <BookCard
                                    key={i}
                                    title="Awesome book"
                                    price="100"
                                    author="gerorge"
                                    img={mainPhoto}
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
                                    slider.scrollBy(-100, 0);
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
                                    slider.scrollBy(100, 0);
                                }}
                            />
                        </div>
                    </div>
                    <div className="homeSlider" id="freeBooksSlider">
                        {books.map((book: number, i: number) => {
                            return (
                                <BookCard
                                    key={i}
                                    title="Awesome book"
                                    price="100"
                                    author="gerorge"
                                    img={mainPhoto}
                                />
                            );
                        })}
                    </div>
                </section>

                <section className="section feedbackSection">
                    <h1 className="title">Our Customers</h1>
                    <div className="FeedbackContainer">
                        <CustomersFeedback img={mainPhoto} />
                        <CustomersFeedback img={mainPhoto} />
                        <CustomersFeedback img={mainPhoto} />
                    </div>
                    <button className="joinus">Join Us</button>
                    {/* <Button text="join us" type="primary" /> */}
                </section>
            </main>
        </>
    );
}
