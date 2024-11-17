import React, { useState, useEffect } from 'react';
import "/src/pages/main-container.css";
import axios from "axios";
import CalendarGrid from "/src/Components/CalendarGrid/calendargrid.jsx";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

function Calendar() {
    const [data, setData] = useState([{
        "gameId": 25097,
        "name": "The Legend of Zelda: Ocarina of Time",
        "released": "1998-11-21",
        "rating": "4.39",
        "platform": "Nintendo",
        "genres": "Action, Adventure, RPG",
        "stores": "Nintendo Store",
        "metacritic": "99",
        "esrb_rating": "Everyone",
        "tags": "Singleplayer",
        "short_screenshots": "https://media.rawg.io/media/games/3a0/3a0c8e9ed3a711c542218831b893a0fa.jpg, https://media.rawg.io/media/screenshots/aff/aff922f4dfbc562ab31b5b924adbfe93.jpg, https://media.rawg.io/media/screenshots/40a/40aa860328a2295da73336d4060bd973.jpg, https://media.rawg.io/media/screenshots/e72/e72b59594b6abdedf8adbfd5a0e53251.jpg, https://media.rawg.io/media/screenshots/070/070de3718e543e7ac533d09a8758775f.jpg, https://media.rawg.io/media/screenshots/f75/f75e8f877f1851461aba7579ef604f77.jpg, https://media.rawg.io/media/screenshots/f26/f26c6649ce30ae53204aa7f76350b2fd.jpg",
        "imageBackground": "https://media.rawg.io/media/games/3a0/3a0c8e9ed3a711c542218831b893a0fa.jpg"
    },
    {
        "gameId": 407559,
        "name": "Soulcalibur (1998)",
        "released": "1998-07-30",
        "rating": "0.0",
        "platform": "Xbox, SEGA",
        "genres": "Fighting",
        "stores": "",
        "metacritic": "98",
        "esrb_rating": "Teen",
        "tags": "",
        "short_screenshots": "",
        "imageBackground": "null"
    },
    {
        "gameId": 54751,
        "name": "Soulcalibur",
        "released": "1998-07-30",
        "rating": "4.38",
        "platform": "Xbox, iOS, Android, SEGA",
        "genres": "Action, Fighting",
        "stores": "Xbox 360 Store",
        "metacritic": "98",
        "esrb_rating": "null",
        "tags": "2 players",
        "short_screenshots": "https://media.rawg.io/media/games/743/7430f1846ba6ce836f169d936c89819e.jpg, https://media.rawg.io/media/screenshots/9a6/9a629f689c5046e8a540bee2fc5d9886.jpg, https://media.rawg.io/media/screenshots/ef0/ef065a3a1a2669096285e697d48123ac.jpg, https://media.rawg.io/media/screenshots/d3c/d3c0a4a32e6580082fe2a817b68d3738.jpg, https://media.rawg.io/media/screenshots/452/4525e59360ba76ed0b64c06fa35c54b2.jpg, https://media.rawg.io/media/screenshots/b44/b44045d72c82f0392e86de9ce4d10540.jpg, https://media.rawg.io/media/screenshots/9b1/9b173e96f83d2d77770f9b00f2562fa9.jpg",
        "imageBackground": "https://media.rawg.io/media/games/743/7430f1846ba6ce836f169d936c89819e.jpg"
    },
    {
        "gameId": 324997,
        "name": "Baldur's Gate III",
        "released": "2023-08-03",
        "rating": "4.47",
        "platform": "PC, PlayStation, Xbox, Apple Macintosh",
        "genres": "Adventure, RPG, Strategy",
        "stores": "PlayStation Store, GOG, Steam",
        "metacritic": "97",
        "esrb_rating": "Mature",
        "tags": "Singleplayer, Steam Achievements, Multiplayer, Steam Cloud, RPG, Co-op, Online Co-Op, Fantasy, Online multiplayer, Split Screen, Local Co-Op, Local Multiplayer, Cross-Platform Multiplayer, role-playing, Character Customization, Captions available, Isometric, Magic, Steam Trading Cards, CRPG, Party-Based RPG, Role Playing Game, Dungeons & Dragons",
        "short_screenshots": "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg, https://media.rawg.io/media/screenshots/a67/a676cdec0eadc42a133ac49e7f2e1aac.jpg, https://media.rawg.io/media/screenshots/705/705846f6583a6da009a0ae7fcdece36d.jpg, https://media.rawg.io/media/screenshots/d29/d29b1d2726d69432d2b4180a79b9ee9d.jpg, https://media.rawg.io/media/screenshots/ed1/ed19ec8ce43f9dd3553df4a6d9301f61.jpg, https://media.rawg.io/media/screenshots/6c8/6c8983d658a4a24dc8eb9d2f88f1dabf.jpg, https://media.rawg.io/media/screenshots/92c/92cbe16a795afbc9d9837ed9eae4f22b.jpg",
        "imageBackground": "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg"
    },
    {
        "gameId": 56123,
        "name": "Metroid Prime",
        "released": "2002-11-17",
        "rating": "4.38",
        "platform": "Nintendo",
        "genres": "Action, Shooter, Adventure",
        "stores": "",
        "metacritic": "97",
        "esrb_rating": "null",
        "tags": "Singleplayer",
        "short_screenshots": "https://media.rawg.io/media/games/c86/c86bc047ba949959a90fe24209d59439.jpg, https://media.rawg.io/media/screenshots/ab7/ab7efedd1d85fb0007f84a2955ac9d39.jpg, https://media.rawg.io/media/screenshots/788/78816464d5fddfa7f81b892b9b7c6a39.jpg, https://media.rawg.io/media/screenshots/6d9/6d9a1de06e87730707e4f39acd6cc237.jpg, https://media.rawg.io/media/screenshots/c11/c11eaf445d1146cad23f499adbd86b85.jpg, https://media.rawg.io/media/screenshots/29f/29fb6ff5828089ce44aa0e82fe75b176.jpg, https://media.rawg.io/media/screenshots/4ca/4ca53cc663eeea9eb0652413ea4e8372.jpg",
        "imageBackground": "https://media.rawg.io/media/games/c86/c86bc047ba949959a90fe24209d59439.jpg"
    }]);

    console.log(data)

    const initializeDays = () => {
        const today = new Date();

        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const number_of_days = new Date(year, month, 0).getDate()

        // ЗАМЕНИТЬ 31 НА number_of_days!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const days = [];
        for (let i = 0; i <= 31 - 1; i++) {
            days[i.toString()] = [];
        }
        return days;
    };

    const groupByDay = (games) => {
        const grouped = initializeDays();

        games.forEach((game) => {
            const day = new Date(game.released).getDate().toString();
            grouped[day - 1].push(game);
        });

        return grouped;
    };

    // useEffect(() => {
    //     axios.get('http://localhost:8000/games/')
    //         .then(response => {
    //             setData(response.data);
    //             console.log("Successful data recording!")
    //             console.log(data)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);


    return (
        <div>
            <div className="main-content">
                <div className="month-switcher">
                    nov sep
                </div>
                <div className="container">
                    Count of new releases
                    <div className="calendar">
                        <CalendarGrid grouped_data={groupByDay(data)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar