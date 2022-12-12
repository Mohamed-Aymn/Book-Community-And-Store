import Button from "../../components/molecules/Button";
import SearchBar from "../../components/molecules/SearchBar";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import img from "../../assets/mainPhoto.jpg";

export default function () {
    return (
        <main>
            <div className="storeSearch">
                <div className="newSearchContainer">
                    <div className="mainSearchConatiener">
                        <input
                            type="text"
                            placeholder="Genre, author or book name"
                        />
                        <button>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>

            <table className="cartTable">
                <thead>
                    <tr>
                        <th className="tableHeading">product</th>
                        <th className="tableHeading">price</th>
                        <th className="tableHeading">count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tableRow">
                        <td className="productCell">
                            <Image
                                className="cartProductImage"
                                src={img}
                                alt="userImage"
                            />
                            book name
                        </td>
                        <td>99</td>
                        <td>3</td>
                        <td className="countCell">
                            <Button type="secondary" text="+" />
                            <Button type="secondary" text="-" />
                            <Button type="danger" text="remove" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="orderDetails">
                <div>
                    <div>Order summary</div>
                    <div>Sub-total : X</div>
                    <div>Shipping : x</div>
                </div>

                <div>
                    <div>Total: x</div>
                    <Button text="Checkout" type="primary" />
                </div>
            </div>
        </main>
    );
}
