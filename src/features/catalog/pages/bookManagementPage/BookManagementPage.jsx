import AddBook from "./components/addBook/AddBook";
import ManageBook from "./components/manageBook/ManageBook";

function BookManagementPage() {

    return (
        <div>
            <div>
                <AddBook />
            </div>
            <div>
                <ManageBook />
            </div>
        </div>
    );
};

export default BookManagementPage;