import { ReactNode } from "react";
import styles from "./Container.module.scss";

export default function (props: any) {
    // this is wrong i must define their types in the function argument
    // defining the normal arguments of the flex will be not clean with scss attribute seletor (align-items: center, end , start ...)

    /*
    also make title poistin control if it will be displayed as flex with the content or not
    */

    let {
        children,
        margin,
        padding,
        title,
        titleposition,
        indentation,
        display,
        justifycontent,
        alignitems,
        flow,
        gap,
    }: {
        children: ReactNode;
        margin: number;
        padding: number;
        title: string;
        titleposition: string;
        indentation: number;
        display: string;
        justifycontent: string;
        alignitems: string;
        flow: string;
        gap: number;
    } = props;

    return (
        <div className={styles.container} {...props}>
            {title ? <h1 className={styles.title}>{title}</h1> : null}
            {children}
        </div>
    );
}
