import style from "./footer.module.scss";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.content}>
                <div>
                    <BsGithub />
                </div>

                <div className={style.text}>
                    <div>Develped using * technologies</div>
                    <div className={style.license}>
                        <div>copyRight reserverd</div>
                        <div>licensed with bla license</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
