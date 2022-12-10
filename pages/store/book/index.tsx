import Image from "next/image";
import Reviews from "../../../components/organisms/Reviews";

export default function ({ img }: any) {
    return (
        <main>
            <div className="bookInfoContainer">
                <Image src={img} className="bookMainImage" alt="Book Image" />

                <div>
                    <h1>title</h1>
                    <div>rate (stars)</div>
                    <div>author</div>
                    <div>publish date</div>
                    <div>pages</div>
                    <div>printed / Electronic</div>
                    <div>available / not</div>
                    <div>lang</div>
                </div>
            </div>

            <div>
                <h2>Reviews</h2>
                <Reviews />
            </div>
        </main>
    );
}
