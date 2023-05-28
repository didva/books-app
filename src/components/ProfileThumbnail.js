import React, {useContext} from 'react';
import UserContext from "../contexts/UserContext";
import {Card} from "react-bootstrap";

const ProfileThumbnail = ({showInfo, size}) => {

    const {user} = useContext(UserContext);

    return <>
        {user &&
            <Card className="text-center">
                <Card.Img style={{width: size, margin: '0 auto'}} variant="top" src={user.picture} referrerPolicy="no-referrer"/>
                {showInfo === true &&
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Title>{user.email}</Card.Title>
                    </Card.Body>
                }
            </Card>
        }
    </>
};

export default ProfileThumbnail;