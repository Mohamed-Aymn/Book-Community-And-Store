import { Transition } from "react-transition-group";
import useBookStore from "../../client_state/useBookStore";
import BookDetailsModal from "../organisms/BookDetailsModal";

export default function Modals() {
    const { isDisplayingBookDetails } = useBookStore();

    return (
        <>
            <Transition
                in={isDisplayingBookDetails}
                timeout={300}
                unmountOnExit
            >
                {(state) => <BookDetailsModal TransitionState={state} />}
            </Transition>
        </>
    );
}
