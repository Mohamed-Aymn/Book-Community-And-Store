import { useRouter } from "next/router";
import { FaSearch, FaFilter } from "react-icons/fa";
import styles from "./SearchBar.module.scss";

export default function (props: any) {
    let router = useRouter();

    const searchHanlder = () => {
        props.searchFunction();
        router.push({
            pathname: "/store",
            query: { search: props.searchState },
        });
    };

    return (
        <div className={styles.mainSearchContainer}>
            <div
                className={styles.upperBar}
                suggestions={props.suggestions !== undefined ? "true" : null}
            >
                <input
                    type="text"
                    placeholder={props.placeholder}
                    value={props.searchState}
                    onChange={async (e) => {
                        await props.setSearchState(e.target.value);
                        props.searchState !== ""
                            ? props.suggestinosFunction()
                            : null;
                    }}
                    onKeyDown={(e) => {
                        e.key == "Enter" ? searchHanlder() : null;
                    }}
                />
                <div className={styles.buttonsGroup}>
                    <button
                        onClick={props.searchFunction}
                        className={styles.searchIcon}
                    >
                        <FaSearch />
                    </button>
                    {props.config && (
                        <>
                            <div className={styles.verticalDivider} />
                            <button
                                className={styles.filterIcon}
                                onClick={async () => {
                                    props.configState
                                        ? props.setConfigState(false)
                                        : props.setConfigState(true);
                                }}
                            >
                                <FaFilter />
                            </button>
                        </>
                    )}
                </div>
            </div>
            {props.suggestions !== undefined && (
                <div className={styles.suggestionsContainer}>
                    {props.suggestions.map((suggestion: any, i: number) => {
                        return (
                            <div
                                key={i}
                                onClick={async () => {
                                    await props.setSearchState(
                                        suggestion.volumeInfo.title
                                    );
                                    props.searchFunction();
                                }}
                            >
                                {suggestion.volumeInfo.title}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
