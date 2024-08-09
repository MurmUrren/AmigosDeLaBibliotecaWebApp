import BookList from "../bookList/components/BookList";
import DeleteBook from "./components/deleteBook/DeleteBook";

function BookManagementPage() {

    return (
        <div>
            <div>
                <BookList />
            </div>
            <div>
                <DeleteBook />
            </div>
        </div>
    );
};

export default BookManagementPage;