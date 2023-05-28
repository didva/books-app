import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import VolumeList from '../VolumeList';
import {useBooksApiService} from "../../contexts/BooksApiServiceContext";

const UserShelve = () => {
    const params = useParams();
    const [shelve, setShelve] = useState({});
    const booksApiService = useBooksApiService();

    useEffect(() => {
        setShelve({});
        booksApiService.getShelve(params.shelveId).then(shelve => {
            setShelve(shelve);
        });
    }, [booksApiService, params]);

    return (
        <div>
            <h1 className="page-header">Shelve {shelve?.title}</h1>
            <VolumeList queryPath={'/mylibrary/bookshelves/' + params.shelveId + '/volumes'} shelveId={params.shelveId}/>
        </div>
    );
}

export default UserShelve;