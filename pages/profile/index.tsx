import Button from "../../components/molecules/Button";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";
import Reviews from "../../components/organisms/Reviews";

export default function () {
    return (
        <main className="profileMainContainer">
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
                        <div className="bio">
                            detialed bio, Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Tenetur ab et
                            explicabo itaque, amet, natus ipsam, fugiat maiores
                            expedita{" "}
                        </div>
                    </div>
                </div>
                <Button text="connect" type="primary" />
            </div>

            <div className="profileBody">
                <div className="profileInfo">
                    <div>
                        <b>Favourite genres</b>
                        <div>scienfific hello</div>
                    </div>
                    <div>
                        <b>Books read</b>
                        <div>Rich Dad Poor Dad</div>
                    </div>
                    <div>
                        <div>
                            <b>X connections</b>
                        </div>
                        <div>connections sample</div>
                    </div>
                </div>
                <div>
                    <h2>Reviews</h2>
                    <Reviews />
                </div>
            </div>
        </main>
    );
}
