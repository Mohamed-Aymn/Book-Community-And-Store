import BookCard from "../components/organisms/BookCard";
import LandingConatiner from "../components/organisms/LandingContainer";
import mainPhoto from "../assets/mainPhoto.jpg";
import CustomersFeedback from "../components/organisms/CustomersFeedback";
import Button from "../components/molecules/Button";

export default function Home() {
    return (
        <>
            <LandingConatiner />
            <main>
                <section className="section">
                    <h1 className="title">Best Seller Books</h1>
                    <div className="homeSlider">
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                    </div>
                </section>

                <section className="section">
                    <h1 className="title">Free Books</h1>
                    <div className="homeSlider">
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                    </div>
                </section>

                <section className="section">
                    <h1 className="title">Electronic Books</h1>
                    <div className="homeSlider">
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                        <BookCard
                            title="Awesome book"
                            price="100"
                            info="this is info about this book"
                            img={mainPhoto}
                        />
                    </div>
                </section>

                <section className="section feedbackSection">
                    <h1 className="title">Our Customers</h1>
                    <div className="FeedbackContainer">
                        <CustomersFeedback img={mainPhoto} />
                        <CustomersFeedback img={mainPhoto} />
                        <CustomersFeedback img={mainPhoto} />
                    </div>
                    <Button text="join us" type="primary" />
                </section>
            </main>
        </>
    );
}
