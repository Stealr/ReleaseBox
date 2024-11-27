import React from 'react';
import Card from "/src/Components/CardGameList/CardGameList.jsx";
import "./GameList.css";

function GameList({ data, addCollection, handleGameClick }) {
    return (
        <div className='games-grid'>
            {data.map((game) => (
                <Card
                    key={game.gameId}
                    gameId={game.gameId}
                    name={game.name}
                    released={game.released}
                    platform={game.platform}
                    genres={game.genres}
                    metacritic={game.metacritic}
                    imageBackground={game.imageBackground}
                    addCollection={addCollection}
                    handleGameClick={handleGameClick}
                />
            ))}
        </div>
    );
}

export default GameList;
