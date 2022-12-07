import LandingConatiner from "../components/organisms/LandingContainer";
import styles from "./index.module.scss";
import Container from "../components/molecules/Container";
import Button from "../components/molecules/Button";
import BookCard from "../components/organisms/BookCard";

export default function Home() {
    return (
        <main>
            <LandingConatiner />

            <Container
                title="Best Seller Books"
                titleposition="center"
                margin="big"
            >
                <Container display="flex">
                    <BookCard title="myBook" anotherInfo="cool" />
                </Container>
            </Container>

            <Container title="Free Books" titleposition="center" margin="big">
                <div>side slider</div>
            </Container>

            {/* this is an advertising section */}
            <div className={styles.advertisingContainer}>advertising area</div>

            <Container
                title="Electronic Books"
                titleposition="center"
                margin="big"
            >
                <div>side slider</div>
            </Container>

            <Container
                title="Our Customers"
                titleposition="center"
                margin="big"
            >
                <div>Customers cards</div>
                <Button type="primary" text="Join Us!" />
            </Container>

            {/*.

            <section className={styles.section}>
                <h1 className={styles.title}>Trending</h1>
                <div>side slider</div>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Free-books</h1>
                <div>side slider</div>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>E-books</h1>
                <div>side slider</div>
            </section>

            <section className={styles.section}>
                <h1 className={styles.title}>Our Customers</h1>
                <OurClients />
            </section> */}
        </main>
    );
}
