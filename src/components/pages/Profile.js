import React, {useContext, useEffect, useState} from 'react';
import ProfileThumbnail from "../ProfileThumbnail";
import UserContext from "../../contexts/UserContext";
import Loader from "../Loader";
import {Link} from "react-router-dom";
import {useBooksApiService} from "../../contexts/BooksApiServiceContext";

const Profile = () => {
    const {user} = useContext(UserContext);
    const [shelves, setShelves] = useState([]);
    const [loading, setLoading] = useState(false);
    const booksApiService = useBooksApiService();

    useEffect(() => {
        if (!user) {
            return;
        }
        setShelves([]);
        setLoading(true);
        booksApiService.getShelves().then(shelves => {
            setShelves(shelves.items);
            setLoading(false);
        });
    }, [booksApiService, user]);

    return (
        <div className="profile-container">
            {user &&
                <>
                    <div className="user-profile-info">
                        <ProfileThumbnail/>
                        <div>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <div>
                        <Loader loading={loading}/>
                        <div>
                            {!loading && shelves &&
                                <table className="shelves-table">
                                    <thead>
                                        <th>Shelve Name</th>
                                        <th>Books Count</th>
                                        <th>Created Date</th>
                                    </thead>
                                    <tbody>
                                        {shelves.map(shelve =>
                                            <tr key={shelve.id} className="shelves-row">
                                                <td><Link to={"/user-shelve/" + shelve.id}>{shelve.title}</Link></td>
                                                <td>{shelve.volumeCount}</td>
                                                <td>{shelve.created}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </>
            }
            {!user &&
                <h1>Please login...</h1>
            }
        </div>
    );
}

export default Profile;