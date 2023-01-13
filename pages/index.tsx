import LandingConatiner from "../components/organisms/LandingContainer";
import mainPhoto from "../assets/mainPhoto.jpg";
import CustomersFeedback from "../components/organisms/CustomersFeedback";
import Button from "../components/atoms/Button";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <LandingConatiner />
            <main>
                <section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit blanditiis voluptatibus consequuntur enim sequi unde
                    rem odit similique? Eveniet vel saepe, dicta odio labore
                    alias dolore est. Nemo, labore inventore. Sit totam
                    repellendus error vitae nobis deserunt repudiandae
                    voluptates ea magnam reprehenderit natus perspiciatis sequi
                    quasi repellat, facere excepturi aliquid voluptatum ullam.
                    Odio animi magni, maiores ducimus dicta veritatis ipsum.
                    Nihil ut amet eligendi asperiores pariatur voluptatibus
                    accusantium a doloribus fugit dignissimos at ea ex facilis
                    molestias explicabo corrupti dolore, minus totkam illo,
                    veritatis delectus sint. Deleniti asperiores ullam unde.
                    Quam iste voluptatem veniam omnis asperiores natus minima
                    non soluta hic cumque architecto, commodi doloremque
                    nesciunt eveniet id cum odit sint ratione animi sed eligendi
                    iure! Eligendi dolore eveniet cupiditate! Quam aliquam, quis
                    ipsa, dolorem aut quas ipsam, officiis velit tempore nisi
                    omnis. Soluta, facilis accusantium tenetur quibusdam nulla
                    quaerat autem fugiat pariatur quod sapiente quam similique
                    dolore provident blanditiis. Eius accusamus aspernatur modi
                    at impedit ducimus placeat, tempore voluptatem fugiat,
                    corporis facilis obcaecati veritatis velit doloribus
                    blanditiis, consequatur nemo quae autem delectus quasi
                    molestiae officiis libero! Voluptate, eos quis? Repellat
                    iste deleniti quos neque dolores corrupti quas officiis
                    consectetur earum nam debitis atque aspernatur magnam
                    voluptates, quam laboriosam doloribus quasi mollitia
                    veritatis architecto! Ut possimus voluptate asperiores nisi
                    veniam. Eius voluptate est quaerat assumenda animi
                    dignissimos minus incidunt deleniti, ipsa voluptatum
                    reiciendis nostrum dicta? Iusto ex, omnis non ut impedit
                    labore nam laborum tempore reiciendis quasi, accusamus
                    doloremque dolores. Qui est amet voluptatum autem fugiat
                    vitae eum deserunt ex nemo placeat, voluptates corrupti,
                    ipsa sunt modi, ducimus aliquid cumque esse nobis neque.
                    Quae officia numquam magnam necessitatibus, quidem modi.
                    Expedita tempora autem sunt, quae fugiat facilis sapiente
                    harum eaque alias ipsam dolore magni vel ut quaerat in
                    officiis necessitatibus libero quidem nisi earum deleniti
                    facere? Soluta adipisci molestias obcaecati? Ad nesciunt,
                    nemo, autem nam dolorem tempore molestias harum placeat
                    possimus odit expedita, temporibus assumenda delectus nulla
                    iure! Quos dignissimos, vero veniam animi placeat quia rem
                    itaque sapiente aliquam nulla! Velit unde delectus porro,
                    odio commodi veniam ab tempore, necessitatibus maiores et
                    dignissimos ratione error sed, consectetur vero repudiandae
                    nihil! Dolor fugiat facere dolore. Assumenda soluta autem
                    eligendi aspernatur repellendus? Quasi exercitationem in,
                    veniam aut, molestias architecto perferendis dolores labore
                    dicta quos, illum dolore ex odio vitae impedit facilis
                    assumenda nihil sed quo atque totam autem laborum cum?
                    Earum, amet. Deserunt facere vitae reprehenderit eveniet
                    possimus voluptatem minima debitis id voluptatibus qui
                    consectetur impedit animi, atque sapiente maiores voluptatum
                    provident, cum beatae cumque, iusto porro quia fugiat
                    inventore? Consequuntur, excepturi? Quidem reiciendis earum
                    quos officia aspernatur similique mollitia! Vel tempora
                    deserunt numquam accusamus voluptas velit commodi iure
                    incidunt harum provident ea molestias nemo, expedita,
                    corrupti consectetur praesentium perferendis. Quidem, culpa.
                    At, porro assumenda! Dignissimos nihil non maiores sapiente,
                    temporibus deserunt quam rerum quaerat, cupiditate vel
                    cumque facilis, incidunt dolore consequuntur quibusdam
                    voluptates veniam quia ducimus adipisci tempora! Numquam,
                    natus excepturi. Facere quod aut culpa earum nesciunt,
                    beatae eaque id, dolorum doloribus eum recusandae fugit hic!
                    Ducimus in blanditiis adipisci saepe quis voluptate aliquam
                    sint, amet doloribus, necessitatibus, delectus qui!
                    Necessitatibus. Atque exercitationem voluptas tenetur ipsum
                    eos ullam animi illo odit necessitatibus aliquid placeat
                    minima doloribus, architecto culpa ratione neque officiis
                    cumque. Nobis pariatur odio delectus, veritatis molestias
                    magnam beatae corporis! Corporis error consectetur atque
                    neque deleniti aut ipsam iusto delectus maiores sequi.
                    Accusantium explicabo dignissimos quibusdam harum eos
                    assumenda eius laborum corrupti aliquam asperiores vitae,
                    unde sequi? Nobis, consequuntur laboriosam? Fugiat labore,
                    voluptatem aperiam facilis voluptatibus, sit sed aliquam id
                    repudiandae ratione quae accusantium animi laudantium
                    praesentium voluptates! Cum excepturi, provident assumenda
                    similique molestias dolores qui debitis tempore deleniti
                    quam!
                </section>
                <section className="section feedbackSection">
                    <h1 className="title">Our Customers</h1>
                    <div className="FeedbackContainer">
                        <CustomersFeedback
                            img={mainPhoto}
                            name="Auston Nichola"
                        />
                        <CustomersFeedback
                            img={mainPhoto}
                            name="Agatha Christie"
                        />
                        <CustomersFeedback
                            img={mainPhoto}
                            name="Houston Rickie"
                        />
                    </div>
                    <Link href="auth/signup" style={{ textDecoration: "none" }}>
                        <Button text="Join Us!" approach="catchy" size="big" />
                    </Link>
                </section>
            </main>
        </div>
    );
}
