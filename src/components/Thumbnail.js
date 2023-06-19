import React, {useCallback} from "react";
import {Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Rating from "./Rating";
import RemoveFromShelve from "./RemoveFromShelve";
import AddToShelve from "./AddToShelve";

const Thumbnail = ({volume, shelveId, removeFromShellTrigger}) => {
    const url = "/volume?id=" + volume.id;
    const navigate = useNavigate();
    const onMouseDown = useCallback(() => {
        navigate(url);
    }, [navigate, url]);

    return (
        <Card style={{ width: "15rem" }}>
            <Link onMouseDown={onMouseDown} to={url}>
                <Card.Img variant="top" src={volume.volumeInfo?.imageLinks?.thumbnail} />
            </Link>
            <Card.Body>
                <Link onMouseDown={onMouseDown} to={url}>
                    <Card.Title>{volume.volumeInfo.title}</Card.Title>
                </Link>
                <Card.Text>
                    <Rating volumeInfo={volume.volumeInfo}/>
                </Card.Text>
                <AddToShelve volumeId={volume.id}/>
                {shelveId &&
                    <RemoveFromShelve volumeId={volume.id} shelveId={shelveId} callback={removeFromShellTrigger}/>
                }
            </Card.Body>
        </Card>
    );
};

export default Thumbnail;