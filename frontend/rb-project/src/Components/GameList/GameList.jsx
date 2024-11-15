import React from 'react';
import Card from "/src/Components/CardGameList/CardGameList.jsx";
import "./GameList.css";

function GameList({ data }) { // Деструктурируем пропс
    return (
        <div className='games-grid'>
            {data.map((game) => (
                <Card
                    key={game.id}
                    name={game.name}
                    released={game.released}
                    platform={game.platform}
                    genres={game.genres}
                    metacritic={game.metacritic}
                    imageBackground={game.imageBackground}
                />
            ))}
        </div>
    );
}

export default GameList;
