import Button from "../../components/molecules/Button";
import Container from "../../components/molecules/Container";
import styles from "./index.module.scss";

export default function () {
    return (
        <main>
            <Container display="flex">
                <div className={styles.image} />
                <Container title="user name">
                    <div>fast bio</div>
                    <Button text="connect" type="primary" />
                </Container>
            </Container>

            <Container display="flex">
                <Container>
                    profile info
                    <div>
                        <div>X connections</div>
                        <div>connections sample</div>
                    </div>
                    <div>detialed bio</div>
                    <div>read books</div>
                </Container>
                <Container>
                    newsfeed
                    <div>review about something</div>
                    <div>announcment</div>
                </Container>
            </Container>
        </main>
    );
}
