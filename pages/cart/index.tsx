import Button from "../../components/molecules/Button";
import SearchBar from "../../components/molecules/SearchBar";

export default function () {
    return (
        <main>
            <h1>Cart</h1>

            <SearchBar />

            <table className="cartTable">
                <thead>
                    <tr>
                        <th>product</th>
                        <th>price</th>
                        <th>count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>99</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>

            <div className="orderDetails">
                <div>
                    <div>Order summary</div>
                    <div>Sub-total : X</div>
                    <div>Shipping : x</div>
                </div>

                <div>Total: x</div>
                <Button text="Checkout" type="primary" />
            </div>
        </main>
    );
}
