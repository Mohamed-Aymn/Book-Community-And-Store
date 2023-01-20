import TagList from "../../TagList";
import styled from "styled-components";
import Select from "../../../atoms/Select";
import FormItem from "../../FormItem";
import Divider from "../../../atoms/Divider";
import RadioButton from "../../../atoms/RadioButton";

const SearchConfigContainer = styled.div`
    padding: 0 0.7em;
`;

export default function (props: {
    setSearchQuery: (data: any) => void;
    searchQuery: any;
    setSearchFilters: (data: any) => void;
    searchFilters: any;
}) {
    return (
        <SearchConfigContainer>
            <FormItem label="Search by">
                <RadioButton
                    name="searchBy"
                    value="search"
                    state={props.searchQuery}
                    setState={(value: any) => {
                        props.setSearchQuery(value);
                    }}
                >
                    Both book title and author name
                </RadioButton>
                <RadioButton
                    name="searchBy"
                    value="intitle"
                    state={props.searchQuery}
                    setState={(value: any) => {
                        props.setSearchQuery(value);
                    }}
                >
                    Book title
                </RadioButton>
                <RadioButton
                    name="searchBy"
                    value="inauthor"
                    state={props.searchQuery}
                    setState={(value: any) => {
                        props.setSearchQuery(value);
                    }}
                >
                    Author name
                </RadioButton>
                {/* 
                // skip this now

                <button>both book title and author name</button>
                <button
                    onClick={() => {
                        props.setSearchQuery({
                            inTitle: true,
                            inAuthor: false,
                            genre: false,
                        });
                        console.log(props.searchQuery);
                    }}
                >
                    Book title
                </button>
                <button
                    onClick={() =>
                        props.setSearchQuery({
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
                        props.setSearchQuery({
                            genre: true,
                            inAuthor: false,
                            inTitle: false,
                        })
                    }
                >
                    genre
                </button>
                {props.searchQuery.genre && (
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
                )} */}
            </FormItem>

            <br />

            <b style={{ color: "#cacaca" }}>Filter</b>
            <FormItem label="Language">
                <Select
                    options={["en", "ar"]}
                    state={props.searchFilters.lang}
                    name="searchFilter"
                    setState={(value: any) => {
                        props.setSearchFilters({
                            ...props.searchFilters,
                            lang: value,
                        });
                    }}
                />
            </FormItem>
        </SearchConfigContainer>
    );
}
