import React from 'react';
import './presentGames.css';
import Card from "/src/Components/CardGameList/CardGameList.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PresentGames({ listGames = [], }) {
    const navigate = useNavigate();

    // Функция для добавления игры в коллекцию
    const addCollection = async (gameId) => {
        const user_id = localStorage.getItem('userID');
        const accessToken = localStorage.getItem('accessToken');
        const collection_name = "Done"; // Пример: коллекция "Done"
        const user_rating = ""; // Вы можете передать рейтинг игры

        if (!accessToken) {
            console.error('Пользователь не залогинен.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/games/addToCollection/', {
                user_id,
                collection_name,
                gameId,
                user_rating,
            });

            if (response.status === 200) {
                console.log('Игра успешно добавлена в коллекцию:', response.data);
            }
        } catch (error) {
            console.error('Ошибка при добавлении игры в коллекцию:', error);
        }
    };

    // Обработчик клика по игре
    const handleGameClick = (name, gameId) => {
        navigate(`/games/${name}`, { state: { id: gameId } });
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
                />
            ))}
        </div>
    );
}

export default PresentGames;
