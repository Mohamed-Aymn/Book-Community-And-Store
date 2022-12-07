import Button from "../../components/molecules/Button";

export default function () {
    return (
        <main>
            <h1>Cart</h1>

            <table>
                <thead>
                    <tr>
                        <th>product</th>
                        <th>price</th>
                        <th>count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>item</td>
                        <td>item</td>
                        <td>item</td>
                    </tr>
                </tbody>
            </table>

            <div>Sub-total : X</div>
            <div>Shipping : x</div>
            <div>Total: x</div>

            <Button text="Place order" type="primary" />
        </main>
    );
}
