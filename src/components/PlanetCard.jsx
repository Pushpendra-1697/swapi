import React from 'react';
import ResidentCard from './ResidentCard';

const PlanetCard = ({ name, climate, population, terrain, residents }) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '5px' }}>
            <h2>Name: {name}</h2>
            <p>Climate: {climate}</p>
            <p>Population: {population}</p>
            <p>Terrain: {terrain}</p>
            <div>
                <h4>Residents: {residents.length}</h4>
                {(residents && residents.length > 0) ? residents?.map((residentUrl, index) =>
                    <ResidentCard key={index} residentUrl={residentUrl} />
                ) : null}
            </div>
        </div>
    );
}

export default PlanetCard;