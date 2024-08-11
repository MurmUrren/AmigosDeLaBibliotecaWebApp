import ManageCollections from "./components/manageCollections/ManageCollections";
import ManageGenres from "./components/manageGenres/ManageGenres";

function CollectionGenreManagementPage() {

    return (
        <div>
            <h1>Colecciones</h1>
            <div>
                <ManageCollections />
            </div>
            <h1>Géneros</h1>
            <div>
                <ManageGenres />
            </div>
        </div>
    );
};

export default CollectionGenreManagementPage;