import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useContextCard = () => {
    const navigate = useNavigate();

    const deleteGame = async (gameId, collection_name, user_rating) => {
    
    }

    const addCollection = async (gameId, collection_name, user_rating) => {
        const user_id = localStorage.getItem('userID');
        const accessToken = localStorage.getItem('accessToken');

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

    const handleGameClick = (name, gameId) => {
        navigate(`/games/${name}`, { state: { id: gameId } });
    };
    

    return {
        addCollection,
        handleGameClick,
    };
};