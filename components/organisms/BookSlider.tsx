import styled from "styled-components";
import Button from "../atoms/Button";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import BookCard from "./BookCard";
import mainPhoto from "../../assets/mainPhoto.jpg";

const SliderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: -1.7em;
`;

const SliderControlers = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7em;
`;

const SliderBody = styled.div`
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    padding: 1.7em 0;
    overflow: hidden;
    width: 100vw;
    width: 100%;
    /* overflow-y: hidden; */
    scroll-behavior: smooth;
`;

interface ISlider {
    title: string;
    data: [];
}

export default function ({ title, data }: ISlider) {
    return (
        <div>
            {/* <div style={{ width: "100vw", backgroundColor: "red" }}>d</div> */}
            <SliderHeader>
                <h1>{title}</h1>
                <SliderControlers>
                    <Button
                        text="View All"
                        approach="primary"
                        // type on click logic here to fetch specific data (genre , print type and etc)
                    />
                    <Button
                        icon={<MdOutlineNavigateBefore />}
                        approach="secondary"
                        onClick={() => {
                            let slider = document.getElementById(
                                `${title}Slider`
                            ) as HTMLDivElement;
                            slider.scrollBy(-175, 0);
                        }}
                    />
                    <Button
                        icon={<MdOutlineNavigateNext />}
                        approach="secondary"
                        onClick={() => {
                            let slider = document.getElementById(
                                `${title}Slider`
                            ) as HTMLDivElement;
                            slider.scrollBy(175, 0);
                        }}
                    />
                </SliderControlers>
            </SliderHeader>
            <SliderBody id={`${title}Slider`}>
                {data &&
                    data.map((item: any) => {
                        return (
                            <BookCard
                                key={item.id}
                                title={item.volumeInfo.title}
                                author={item.volumeInfo.authors}
                                price={99}
                                img={
                                    item.volumeInfo.imageLinks?.thumbnail ||
                                    mainPhoto
                                }
                            />
                        );
                    })}
            </SliderBody>
        </div>
    );
}
