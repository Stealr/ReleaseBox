import React, { useState, useEffect } from 'react';
import axios from "axios";
import './profile.css';
import PresentGames from '/src/Components/profile/presentGames.jsx';
import { useNavigate } from "react-router-dom";
import GameList from "/src/Components/GameList/GameList.jsx";
import Filters from "/src/Components/Filters/filters.jsx";
import Sorts from "/src/Components/Filters/sorts/sorts.jsx";
import { useContextCard } from "/src/context/contextCardGame.js";


function Profile({ onLogOut }) {
    const [data, setData] = useState([]); // Данные пользователя
    const [collections, setCollections] = useState({}); // Данные для всех коллекций
    const [loading, setLoading] = useState(true); // Индикатор загрузки данных
    const [amount, setAmount] = useState(4); // Состояние для ширины экрана
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
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
    }, [user_id]);

    // Функция для загрузки игр из коллекции
    const fetchGames = async (collection) => {
        if (!data.userCollection || !data.userCollection[collection]) return []; // Проверяем наличие данных

        const listGames = data.userCollection[collection].map(game => game[0]);
        try {
            const response = await axios.get("http://localhost:8000/get_games/", {
                params: { game_id: listGames } // Передача массива game_id
            });
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userID');
        onLogOut()

        navigate(`/games`);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
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

    const filteredGames = selectedCategory
        ? collections[selectedCategory]?.filter((game) =>
            game.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];


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
                            ) : selectedCategory ? ( // Если выбрана категория
                                <div className="present-games">
                                    <h2>{selectedCategory}</h2>
                                    <div className='filters-sort'>
                                        <Filters applybtn={applyFilters} filterSwitcher={false} />
                                        <span className='found'>Games are found: {Object.keys(collections[selectedCategory]).length}</span>
                                    </div>
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
                                    />
                                </div>
                            ) : ( // Если категория не выбрана, показываем по 4 игры из каждой
                                Object.entries(collections).map(([category, games]) => (
                                    <div className="present-games" key={category}>
                                        <h2>{category}</h2>
                                        <PresentGames listGames={games.slice(0, amount) || []} />
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