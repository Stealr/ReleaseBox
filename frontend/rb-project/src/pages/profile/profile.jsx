import React, { useState, useEffect } from 'react';
import axios from "axios";
import './profile.css';
import PresentGames from '/src/Components/profile/presentGames.jsx';
import { useNavigate } from "react-router-dom";

function Profile({ onLogOut }) {
    const [data, setData] = useState([]); // Данные пользователя
    const [collections, setCollections] = useState({}); // Данные для всех коллекций
    const [loading, setLoading] = useState(true); // Индикатор загрузки данных
    const [amount, setAmount] = useState(4); // Состояние для ширины экрана
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

            const collectionsToFetch = ["Favourite", "Playing", "Done", "Wishlist", "Abandoned"];
            const loadedCollections = {};

            for (const collection of collectionsToFetch) {
                loadedCollections[collection] = await fetchGames(collection);
            }

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
                                {["All Games", "Wishlist", "Playing", "Done", "Favourite", "Abandoned"].map((field) => {
                                    let count = 0;

                                    if (field === "All Games" && data.userCollection) {
                                        count = Object.values(data.userCollection).reduce((sum, items) => sum + items.length, 0);
                                    } else if (data.userCollection && data.userCollection[field]) {
                                        count = data.userCollection[field].length;
                                    }

                                    return (
                                        <div className="block" key={field}>
                                            <div className="btn-collection">
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
                            ) : (
                                <>
                                    <div className="present-games">
                                        <h2>Favourite</h2>
                                        <PresentGames listGames={collections["Favourite"].slice(0, amount) || []} />
                                    </div>
                                    <div className="present-games">
                                        <h2>Playing</h2>
                                        <PresentGames listGames={collections["Playing"].slice(0, amount) || []} />
                                    </div>
                                    <div className="present-games">
                                        <h2>Done</h2>
                                        <PresentGames listGames={collections["Done"].reverse().slice(0, amount) || []} />
                                    </div>
                                    <div className="present-games">
                                        <h2>Wishlist</h2>
                                        <PresentGames listGames={collections["Wishlist"].slice(0, amount) || []} />
                                    </div>
                                    <div className="present-games">
                                        <h2>Abandoned</h2>
                                        <PresentGames listGames={collections["Abandoned"].slice(0, amount) || []} />
                                    </div>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
