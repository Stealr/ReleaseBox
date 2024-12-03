import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useContextCard = () => {
    const navigate = useNavigate();

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

    const applyFilters = async (yearRange, metacriticRange, selectedGenres, selectedPlatforms, selectedModes) => {
        const filters = {};

        if (yearRange[0] !== 1980 || yearRange[1] !== new Date().getFullYear() + 2) {
            filters.released = {
                start: yearRange[0],
                end: yearRange[1],
            };
        }

        if (metacriticRange[0] !== 0 || metacriticRange[1] !== 100) {
            filters.metacritic = {
                start: metacriticRange[0],
                end: metacriticRange[1],
            };
        }

        if (selectedGenres.length > 0) {
            filters.genres = selectedGenres;
        }

        if (selectedPlatforms.length > 0) {
            filters.platform = selectedPlatforms;
        }

        if (selectedModes.length > 0) {
            filters.tags = selectedModes;
        }
        if (Object.keys(filters).length != 0) {
            try {
                const response = await axios.get('http://localhost:8000/games/filtration', { filtration: filters });
                setData(response.data);
            } catch (error) {
                console.error('Error applying filters:', error);
            }
        }
        else {
            console.log("Enter filters");
        }
    };
    

    return {
        addCollection,
        handleGameClick,
        applyFilters,
    };
};