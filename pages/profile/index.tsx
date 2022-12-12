import Button from "../../components/molecules/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import Reviews from "../../components/organisms/Reviews";
import BookCard from "../../components/organisms/BookCard";
import mainPhoto from "../../assets/mainPHoto.jpg";
import { useState, useEffect } from "react";
import { BsFillTriangleFill } from "react-icons/bs";

export default function () {
    let [isInfoOpened, setIsInfoOpened] = useState(true);
    let [isReviewsOpened, setIsReviewsOpened] = useState(false);

    useEffect(() => {
        console.log(isReviewsOpened);
    }, [isReviewsOpened]);

    return (
        <main>
            <div className="profileHeader">
                <div className="mainInfo">
                    <Image
                        className="image"
                        src={img}
                        alt="Picture of the author"
                    />
                    <div>
                        <div className="userName">User Name</div>
                        <div className="userTitle">writer/reader</div>
                    </div>
                </div>
                <Button text="connect" type="primary" />
            </div>

            <div className="profileBody">
                <button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.7em",
                    }}
                    onClick={() => setIsInfoOpened(!isInfoOpened)}
                >
                    <BsFillTriangleFill />
                    <h2>Info</h2>
                </button>
                {isInfoOpened && (
                    <div className="infoContent">
                        <div className="infoContentChild">
                            <div>
                                <h3>About</h3>
                                <div className="bio">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Dignissimos in expedita,
                                    placeat quas eius, aliquid maiores est rem
                                    illum omnis blanditiis minima at delectus
                                    nisi corporis! Similique cumque quis
                                    pariatur. Lorem ipsum dolor sit amet
                                    consectetur, adipisicing elit. Maxime
                                    possimus non nisi suscipit excepturi, illum
                                    odit aperiam eum deserunt qui velit harum,
                                    rerum quod quos in ab iure placeat
                                    doloremque.
                                </div>
                            </div>
                            <div>
                                <h3>Favourite genres</h3>
                                <div className="tagsList">
                                    <Button type="tag" text="scientific" />
                                    <Button type="tag" text="historic" />
                                    <Button type="tag" text="novel" />
                                </div>
                            </div>
                            <div>
                                <h3>Books read</h3>
                                <div className="booksList">
                                    <BookCard img={mainPhoto} />
                                    <BookCard img={mainPhoto} />
                                    <BookCard img={mainPhoto} />
                                    <Button text="View All" type="secondary" />
                                </div>
                            </div>
                        </div>
                        <div className="infoContentChild">
                            <h3>Connections</h3>
                            <div>X connections</div>
                            <div>connections sample</div>
                            <Button text="View All" type="secondary" />
                        </div>
                    </div>
                )}

                <div>
                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.7em",
                        }}
                        onClick={() => setIsReviewsOpened(!isReviewsOpened)}
                    >
                        <BsFillTriangleFill />
                        <h2>Reviews</h2>
                    </button>
                    <div className="reviews">
                        {isReviewsOpened && <Reviews />}
                    </div>
                </div>
            </div>
        </main>
    );
}
