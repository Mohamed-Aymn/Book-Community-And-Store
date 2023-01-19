import TagList from "../../TagList";
import styled from "styled-components";

const SearchConfigContainer = styled.div`
    padding: 0 0.7em;
`;

export default function (props: {
    setSearchQueries: (data: any) => void;
    searchQueries: any;
    setSearchFilters: (data: any) => void;
    searchFilters: any;
}) {
    return (
        <SearchConfigContainer>
            <div>
                <b>Search by</b>
                <button>both book title and author name</button>
                <button
                    onClick={() => {
                        props.setSearchQueries({
                            inTitle: true,
                            inAuthor: false,
                            genre: false,
                        });
                        console.log(props.searchQueries);
                    }}
                >
                    Book title
                </button>
                <button
                    onClick={() =>
                        props.setSearchQueries({
                            inAuthor: true,
                            inTitle: false,
                            genre: false,
                        })
                    }
                >
                    author
                </button>
                <button
                    onClick={() =>
                        props.setSearchQueries({
                            genre: true,
                            inAuthor: false,
                            inTitle: false,
                        })
                    }
                >
                    genre
                </button>
                {props.searchQueries.genre && (
                    <>
                        <div>
                            <div>Suggestion</div>
                            <div>
                                you can search for more genres in the search bar
                            </div>
                        </div>

                        <TagList
                            list={[
                                "Horror",
                                "SC-Fi",
                                "Comdey",
                                "Action",
                                "Novel",
                                "History",
                                "Drama",
                                "Poetry",
                                "Adventure",
                                "Romance",
                                "Detective & Mystery",
                                "Philosophy",
                                "Religion",
                                "something else",
                                "something else",
                                "something else",
                            ]}
                        />
                    </>
                )}
            </div>

            <b>filter</b>
            <div>
                <div>lang</div>
                <select
                    onChange={(e) =>
                        props.setSearchFilters({
                            ...props.searchFilters,
                            lang: e.target.value,
                        })
                    }
                >
                    <option value="" style={{ display: "none" }} />
                    <option value="en">English</option>
                    <option value="ar">arabic</option>
                </select>
            </div>
        </SearchConfigContainer>
    );
}
