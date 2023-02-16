import useLayoutStore from "../../client_state/useLayoutStore";
// import BookDetailsModal from "../organisms/BookDetailsModal";

export default function Modals() {
    // const isDisplayingBookDetails = layoutStore(
    //     (state: any) => state.isDisplayingBookDetails
    // );
    // const isNavbarMenu = layoutStore((state: any) => state.isNavbarMenu);

    /* 
    now i have no idea how to handle modals if conidtion to be able 
    to render more than one modal in some cases, or i don't know 
    also if rendereing more than one modal is useful or no
    
    if course this is instead of creating a new state for each modal 
    as i did below

    just search then think how to do it
    */

    return (
        <>
            hello
            {/* {isDisplayingBookDetails && <BookDetailsModal />} */}
            {/* {isNavbarMenu && <NavMenu />} */}
        </>
    );
}
