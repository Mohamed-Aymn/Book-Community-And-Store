import styles from "./Container.module.scss";

export default function (props: any) {
    let {
        children,
        margin,
        titleLevel,

        padding,
        title,
        indentation,
        display,
    }: {
        // --------------------------------------------- common
        children: any;

        margin: string;
        // big / small

        padding: string;
        // big / small

        title: string;
        // object {value: "title", level: "h1", position: "center"}

        titleLevel: number;

        indentation: string;

        // --------------------------------------------- display (flex, +grid in the future)
        display: any;
        // {value: "flex", justifyContent: "center"}
        // and same for align items and flow
        // but gap is only big and samll
    } = props;

    // console.log(display.value);
    // console.log(title);

    // console.log(props.titlePosition);

    return (
        <>
            {title ? (
                <div
                    className={styles.container}
                    padding={padding}
                    margin={margin}
                    indentation={indentation}
                >
                    {titleLevel === 0 ? (
                        <div className={styles.title}>{title}</div>
                    ) : titleLevel === 1 ? (
                        <h1 className={styles.title}>{title}</h1>
                    ) : titleLevel === 2 ? (
                        <h2 className={styles.title}>{title}</h2>
                    ) : null}
                    {/* <h1 className={styles.title}>{title}</h1> */}
                    <div
                        className={styles.content}
                        // display={`${display.value}`}
                    >
                        {children}
                    </div>
                </div>
            ) : (
                // distructuring props like that will not work as not all of values are on the first level
                <div className={styles.container}>{children}</div>
            )}
        </>
    );
}
