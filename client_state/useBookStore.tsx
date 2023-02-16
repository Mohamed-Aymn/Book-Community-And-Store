import create from "zustand";

interface IBookStore {
    id: any;
    modal: boolean;
    searchResult: any;
    searchPagination: number;
    searchQuery: "search" | "intitle" | "inauthor";
    searchFilters: any;
    isDisplayingBookDetails: boolean;
    displayedBookId: any;
    instantlyChangingMainSearchValue: string;
    onClickChangingMainSearchValue: string;

    setSearchFilters: (newValue: any) => void;
    setSearchQuery: (newValue: "search" | "intitle" | "inauthor") => void;
    setSearchPagination: (pageNumber: number) => void;
    setSearchResult: (data: any) => void;
    setId: (newId: any) => void;
    setDisplayedBookId: (id: any) => void;
    setDisplayingBookDetails: (newValue: boolean) => void;
    setOnClickChangingMainSearchValue: (newValue: string) => void;
    setInstantlyChangingMainSearchValue: (suggestion: string) => void;
}

const useBookStore = create<IBookStore>()((set) => ({
    id: "newId",
    modal: false,
    searchResult: null,
    searchPagination: 1,
    onClickChangingMainSearchValue: "",
    instantlyChangingMainSearchValue: "",
    // it should be (search, intitle, inauthor or genre)
    searchQuery: "search",
    searchFilters: {
        lang: "en",
    },
    isDisplayingBookDetails: false,
    displayedBookId: null,

    // actions
    setSearchFilters: (newValue) => {
        set(() => ({ searchFilters: newValue }));
    },
    setSearchQuery: (newValue) => {
        set(() => ({ searchQuery: newValue }));
    },
    setOnClickChangingMainSearchValue: (newValue) => {
        set(() => ({ onClickChangingMainSearchValue: newValue }));
    },
    setSearchPagination: (pageNumber: any) => {
        set(() => ({ searchPagination: pageNumber }));
    },
    setSearchResult: (data: any) => {
        set(() => ({ searchResult: data }));
    },
    setId: (newId: any) => {
        set(() => ({
            id: newId,
        }));
    },
    setDisplayedBookId: (id: any) => {
        set(() => ({
            displayedBookId: id,
        }));
    },
    setDisplayingBookDetails: (newValue: any) => {
        set(() => ({
            isDisplayingBookDetails: newValue,
        }));
        newValue
            ? (document.body.style.overflowY = "hidden")
            : (document.body.style.overflowY = "scroll");
    },
    setInstantlyChangingMainSearchValue: (suggestion: string) => {
        set(() => ({
            instantlyChangingMainSearchValue: suggestion,
        }));
    },
}));

export default useBookStore;
