import React, { useContext } from 'react';
import UserContext from "../contexts/UserContext";

const ProfileThumbnail = () => {

    const { user } = useContext(UserContext);

    return <div>
        {user &&
            <img src={user.picture} alt="User" referrerPolicy="no-referrer"/>
        }
    </div>
};

export default ProfileThumbnail;