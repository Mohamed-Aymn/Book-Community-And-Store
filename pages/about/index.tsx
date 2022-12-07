import Container from "../../components/molecules/Container";

export default function () {
    return (
        <main>
            <h1>About</h1>
            <Container title="who we are" indentation="1">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro ipsa nam totam possimus modi nulla officia? Soluta,
                    voluptates aliquam voluptatibus at commodi architecto
                    praesentium delectus culpa alias nemo necessitatibus
                    suscipit?
                </p>
            </Container>

            <Container title="why" indentation="1">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro ipsa nam totam possimus modi nulla officia? Soluta,
                    voluptates aliquam voluptatibus at commodi architecto
                    praesentium delectus culpa alias nemo necessitatibus
                    suscipit?
                </p>
            </Container>

            <Container title="license" indentation="1">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro ipsa nam totam possimus modi nulla officia? Soluta,
                    voluptates aliquam voluptatibus at commodi architecto
                    praesentium delectus culpa alias nemo necessitatibus
                    suscipit?
                </p>
            </Container>

            <span>
                Developed with ❤ by{" "}
                <a href="https://github.com/Mohamed-Aymn">Mohamed Aymn</a>
            </span>
        </main>
    );
}
