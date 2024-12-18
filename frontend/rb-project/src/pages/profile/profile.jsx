import React, { useState, useEffect } from 'react';
import axios from "axios";
import './profile.css';
import PresentGames from '/src/Components/profile/presentGames.jsx';
import { useNavigate } from "react-router-dom";
import GameList from "/src/Components/GameList/GameList.jsx";
import Filters from "/src/Components/Filters/filters.jsx";
import { useContextCard } from "/src/context/contextCardGame.js";


function Profile({ onLogOut }) {
    const [data, setData] = useState([]); // Данные пользователя
    const [collections, setCollections] = useState({}); // Данные для всех коллекций
    const [loading, setLoading] = useState(true); // Индикатор загрузки данных
    const [amount, setAmount] = useState(4); // Состояние для ширины экрана
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [update, setUpdate] = useState(false);
    const { addCollection, handleGameClick } = useContextCard();
    const user_id = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setAmount(1);
            } else if (window.innerWidth < 1200) {
                setAmount(2);
            } else if (window.innerWidth < 1500) {
                setAmount(3);
            }
            else {
                setAmount(4);
            }
        };

        window.addEventListener('resize', handleResize); // Слушаем изменение размера экрана
        return () => {
            window.removeEventListener('resize', handleResize); // Очистка при размонтировании компонента
        };
    }, []);

    // Функция для получения данных пользователя
    useEffect(() => {
        axios.get(`http://localhost:8000/get_user/`, {
            params: { user_id: user_id } // Передаем user_id как query параметр
        })
            .then((response) => {
                setData(response.data); // Устанавливаем данные пользователя
            })
            .catch((err) => {
                console.error("Error fetching user data:", err.message); // Обрабатываем ошибки
            });
    }, [user_id, update]);

    // Функция для загрузки игр из коллекции
    const fetchGames = async (collection) => {
        if (!data.userCollection || !data.userCollection[collection]) return []; // Проверяем наличие данных

        const listGames = data.userCollection[collection].map(game => game[0]);
        const params = new URLSearchParams();
        listGames.forEach(id => params.append('game_id', id));

        try {
            const response = await axios.get(`http://localhost:8000/get_games/?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${collection} games:`, error);
            return [];
        }
    };

    // Загрузка всех коллекций
    useEffect(() => {
        const loadAllCollections = async () => {
            setLoading(true);

            const collectionsToFetch = ["All games", "Favourite", "Playing", "Done", "Wishlist", "Abandoned"];
            const loadedCollections = {};

            for (const collection of collectionsToFetch) {
                if (collection != "All games") {
                    loadedCollections[collection] = await fetchGames(collection);
                }
                else {
                    loadedCollections[collection] = []
                }
            }

            loadedCollections["All games"] = Object.values(loadedCollections).flatMap(category => category)

            setCollections(loadedCollections); // Устанавливаем данные для всех коллекций

            setLoading(false);
        };

        if (data.userCollection) {
            loadAllCollections(); // Загружаем все коллекции
        }
    }, [data]);

    const logoutHandler = () => {
        // Очистка токенов и данных пользователя
        onLogOut()
        navigate(`/games`);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    function findGameCollection(gameId) {
        // Перебираем все коллекции, исключая "All games"
        for (const [collectionName, games] of Object.entries(collections)) {
            if (collectionName !== 'All games') {
                // Проверяем, есть ли игра с указанным gameId в текущей коллекции
                const game = games.find(game => game.gameId === gameId);
                if (game) {
                    return collectionName; // Возвращаем название коллекции, если игра найдена
                }
            }
        }
        return null; // Возвращаем null, если игра не найдена ни в одной коллекции
    }

    const deleteFromCollection = async (gameId) => {
        const collectionName = findGameCollection(gameId);
        if (!collectionName) return;

        try {
            // Отправка запроса на удаление
            const response = await axios.post('http://localhost:8000/games/deleteFromCollection/', {
                user_id: user_id,
                collection_name: collectionName,
                gameId: gameId,
            });

            console.log(response.data);

            // Обновление состояния
            setCollections((prevCollections) => ({
                ...prevCollections,
                [collectionName]: prevCollections[collectionName].filter(game => game.gameId !== gameId),
                "All games": prevCollections["All games"].filter(game => game.gameId !== gameId)
            }));

            return response.data;
        } catch (error) {
            console.error('Ошибка при удалении из коллекции:', error);
            throw error;
        }
    };

    const fetchGamesFromCollections = async (collection) => {
        if (!collections[collection] || collections[collection].length === 0) {
            return []; // Проверяем, есть ли игры в указанной коллекции
        }
    
        try {
            const listGames = collections[collection].map(game => game.gameId); // Извлекаем gameId из коллекции
            const params = new URLSearchParams();
            listGames.forEach(id => params.append('game_id', id)); // Добавляем gameId в параметры запроса
    
            // Запрос к API
            const response = await axios.get(`http://localhost:8000/get_games/?${params.toString()}`);
            return response.data; // Возвращаем данные из ответа
        } catch (error) {
            console.error(`Error fetching ${collection} games:`, error);
            return [];
        }
    };

    const moveGameToCollection = async (gameId, toCollection) => {
        try {
            const fromCollection = findGameCollection(gameId)

            // Загружаем игры из коллекции, откуда нужно удалить
            const fromCollectionGames = await fetchGamesFromCollections(fromCollection);
            console.log("from ", fromCollectionGames)

            // Загружаем игры из коллекции, куда нужно добавить
            const toCollectionGames = await fetchGamesFromCollections(toCollection);
            console.log("to ", toCollectionGames)

            // Найдем игру, которую нужно переместить
            const gameToMove = fromCollectionGames.find(game => game.gameId === gameId);

            if (!gameToMove) {
                console.error(`Game with ID ${gameId} not found in ${fromCollection}`);
                return;
            }

            // Обновляем локально обе коллекции
            const updatedFromCollection = fromCollectionGames.filter(game => game.gameId !== gameId);
            const updatedToCollection = [...toCollectionGames, gameToMove];
            console.log("Update from ", updatedFromCollection)
            console.log("Update to ", updatedToCollection)

            // Создаем новое состояние коллекций
            setCollections(prevCollections => ({
                ...prevCollections,
                [fromCollection]: updatedFromCollection,
                [toCollection]: updatedToCollection,
                "All games": Object.values({
                    ...prevCollections,
                    [fromCollection]: updatedFromCollection,
                    [toCollection]: updatedToCollection
                }).flat()
            }));
            
            setUpdate(!update)
            console.log(`Game ${gameId} moved from ${fromCollection} to ${toCollection}`);
        } catch (error) {
            console.error(`Error moving game ${gameId} from ${fromCollection} to ${toCollection}:`, error);
        }
    };


    // const applyFilters = async (yearRange, metacriticRange, selectedGenres, selectedPlatforms, selectedModes) => {
    //     const filters = {};

    //     if (yearRange[0] !== 1980 || yearRange[1] !== new Date().getFullYear() + 2) {
    //         filters.released = [yearRange[0], yearRange[1]];
    //     }

    //     if (metacriticRange[0] !== 0 || metacriticRange[1] !== 100) {
    //         filters.metacritic = [metacriticRange[0], metacriticRange[1]];
    //     }

    //     if (selectedGenres.length > 0) {
    //         filters.genres = selectedGenres;
    //     }

    //     if (selectedPlatforms.length > 0) {
    //         filters.platform = selectedPlatforms;
    //     }

    //     if (selectedModes.length > 0) {
    //         filters.tags = selectedModes;
    //     }

    //     if (Object.keys(filters).length !== 0) {
    //         try {
    //             const response = await axios.get('http://localhost:8000/games/filtration', {
    //                 params: { filtration: JSON.stringify(filters) },
    //             });
    //             setData(response.data);
    //         } catch (error) {
    //             console.error('Error applying filters:', error);
    //         }
    //     } else {
    //         fetchData()
    //     }
    // };

    const [userRatings, setUserRatings] = useState([]); // Массив оценок

    useEffect(() => {
        if (data.userCollection) {
            const ratings = Object.values(data.userCollection)
                .flatMap(category => category.map(([id, rating]) => ({ id, rating }))); // Стандартный формат
            setUserRatings(ratings);
        }
    }, [data]);

    const filteredGames = selectedCategory ? collections[selectedCategory]?.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div>
            <img
                src='/src/assets/vampire-the-masquerade-bloodlines-2.jpg'
                className='background-image'
                alt="Background"
            />
            <div className='main-content'>
                <div className='container'>
                    <div className="profile">
                        <div className="left-column">
                            <h2 className='username'>{data.username}</h2>
                            <p>Collections:</p>
                            <div className="btns-col">
                                {["All games", "Wishlist", "Playing", "Done", "Favourite", "Abandoned"].map((field) => {
                                    let count = 0;

                                    if (field === "All games" && data.userCollection) {
                                        count = Object.values(data.userCollection).reduce((sum, items) => sum + items.length, 0);
                                    } else if (data.userCollection && data.userCollection[field]) {
                                        count = data.userCollection[field].length;
                                    }

                                    return (
                                        <div className="block" key={field}>
                                            <div
                                                className={`btn-collection ${selectedCategory?.toLowerCase() === field.toLowerCase() ? 'active' : ''}`}
                                                onClick={() => handleCategorySelect(field)}
                                            >
                                                <p>{field}</p>
                                                <p>{count}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <a className="logout" onClick={logoutHandler}> Log out </a>
                        </div>
                        <div className="right-column">
                            {loading ? (
                                <p>Loading games...</p>
                            ) : selectedCategory ? (
                                <div className="present-games">
                                    <p className='back' onClick={() => setSelectedCategory(null)}>Назад</p>
                                    <h2>{selectedCategory}</h2>
                                    {/* <div className='filters-sort'>
                                        <Filters applybtn={applyFilters} filterSwitcher={false} />
                                        <span className='found'>Games are found: {Object.keys(collections[selectedCategory]).length}</span>
                                    </div> */}
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Enter game's name"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </div>

                                    <GameList
                                        data={filteredGames}
                                        addCollection={addCollection}
                                        handleGameClick={handleGameClick}
                                        userRatings={selectedCategory === "All games" ? userRatings : data.userCollection[selectedCategory]?.map(([id, rating]) => ({ id, rating })) || []}
                                        setUpdate={setUpdate}
                                        deleteFromCollection={deleteFromCollection}
                                        moveGameToCollection={moveGameToCollection}
                                        selectedCategory={selectedCategory}
                                        findGameCollection={findGameCollection}
                                    />
                                </div>
                            ) : ( // Если категория не выбрана, показываем по 4 игры из каждой
                                Object.entries(collections).map(([category, games]) => (
                                    <div className="present-games" key={category}>
                                        <h2 onClick={() => handleCategorySelect(category)}>{category}</h2>
                                        <PresentGames
                                            listGames={games.slice(0, amount) || []}
                                            userRatings={category === "All games" ? userRatings : data.userCollection[category]?.map(([id, rating]) => ({ id, rating })) || []}
                                            setUpdate={setUpdate}
                                            deleteFromCollection={deleteFromCollection}
                                            moveGameToCollection={moveGameToCollection}
                                            selectedCategory={category}
                                        />
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;