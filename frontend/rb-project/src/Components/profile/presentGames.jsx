import React from 'react';
import './presentGames.css';
import Card from "/src/Components/CardGameList/CardGameList.jsx";
import { useContextCard } from "/src/context/contextCardGame.js";


function PresentGames({ listGames = [], userRatings }) {
    const { addCollection, handleGameClick } = useContextCard();

    console.log(userRatings)

    const getUserRating = (gameId) => {
        const ratingEntry = userRatings.find(entry => entry.id === gameId);
        return ratingEntry ? ratingEntry.rating : null;
    };

    // Проверка, если список игр пуст
    if (!listGames || listGames.length === 0) {
        return <p>No games to display.</p>;
    }

    // Отображение списка игр
    return (
        <div className='list-games'>
            {listGames.map((game) => (
                <Card
                    key={game.gameId}
                    gameId={game.gameId}
                    name={game.name}
                    released={game.released}
                    platform={game.platform}
                    genres={game.genres}
                    metacritic={game.metacritic}
                    imageBackground={game.imageBackground}
                    addCollection={() => addCollection(game.gameId)} // Передаем функцию добавления в коллекцию
                    handleGameClick={() => handleGameClick(game.name, game.gameId)} // Передаем функцию обработки клика
                    getUserRating={getUserRating}
                    userRatings={userRatings}
                />
            ))}
        </div>
    );
}

export default PresentGames;
