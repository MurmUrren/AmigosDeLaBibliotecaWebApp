import AddBook from "./components/addBook/AddBook";
import DeleteBook from "./components/deleteBook/DeleteBook";

function BookManagementPage() {

    return (
        <div>
            <div>
                <AddBook />
            </div>
            <div>
                <DeleteBook />
            </div>
        </div>
    );
};

export default BookManagementPage;