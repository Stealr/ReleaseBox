import React from 'react';
import Card from "/src/Components/CardGameList/CardGameList.jsx";
import "./GameList.css";

function GameList({ data, addCollection, handleGameClick, setUpdate, userRatings, deleteFromCollection, moveGameToCollection, selectedCategory, findGameCollection }) {
    const getUserRating = (gameId) => {
        const ratingEntry = userRatings.find(entry => entry.id === gameId);
        return ratingEntry ? ratingEntry.rating : null;
    };

    // Проверка, если список игр пуст
    if (!data || data.length === 0) {
        return <p>No games to display.</p>;
    }

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
                    setUpdate={setUpdate}
                    userRatings={userRatings}
                    getUserRating={getUserRating}
                    deleteFromCollection={deleteFromCollection}
                    moveGameToCollection={moveGameToCollection}
                    selectedCategory={selectedCategory === "All games" ? findGameCollection(game.gameId) : selectedCategory}
                />
            ))}
        </div>
    );
}

export default GameList;
