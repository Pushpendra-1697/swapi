import React, { useEffect, useState } from 'react';

const ResidentCard = ({ residentUrl }) => {
    const [residentDetails, setResidentDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getResidentDetails();
    }, []);

    const getResidentDetails = async () => {
        try {
            setIsLoading(true);
            let res = await fetch(residentUrl);
            res = await res.json();
            setIsLoading(false);
            setResidentDetails(res);
        } catch (e) {
            console.log(e);
            setIsError(true);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
            setIsError(false);
        }
    };

    console.log(residentDetails);
    if (isLoading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>
    };
    if (isError) {
        return <p style={{ textAlign: 'center' }}>Errror...</p>
    };
    return (
        <div style={{ border: '1px solid black', borderRadius: '5px' }}>
            <h6>Name: {residentDetails?.name}</h6>
            <p>Height: {residentDetails?.height}</p>
            <p>Mass: {residentDetails?.mass}</p>
            <p>Gender: {residentDetails?.gender}</p>
        </div>
    );
}

export default ResidentCard;