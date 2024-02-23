import React, { useEffect, useState } from 'react';

const ResidentCard = ({ residentUrl, index }) => {
    const [residentDetails, setResidentDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [flag, setFlag] = useState(false);

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

    if (isLoading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>
    };
    if (isError) {
        return <p style={{ textAlign: 'center' }}>Errror...</p>
    };
    return (
        <div style={{ position: 'relative' }}>
            <p onClick={() => setFlag(!flag)} style={{ cursor: 'pointer' }}>Resident {index + 1}</p>
            {flag && <div style={{ position: 'absolute', zIndex: 10, background: 'white', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '0px 5px', border: '1px solid black', borderRadius: '5px', minWidth:'100px' }}>
                <h6>Name: {residentDetails?.name}</h6>
                <p>Height: {residentDetails?.height}</p>
                <p>Mass: {residentDetails?.mass}</p>
                <p>Gender: {residentDetails?.gender}</p>
            </div>}
        </div>
    );
}

export default ResidentCard;