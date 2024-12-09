import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import "./test.css";

function Test() {
    
    

    const API_KEY = 'd6c9714af1784481affffd3493eff327'; // Замените на свой API-ключ

    // const fetchData = async () => {
    //     try {
    //         const [tagsResponse] = await Promise.all([
    //             // axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`),
    //             // axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`),
    //             axios.get(`https://api.rawg.io/api/tags?page=1&page_size=50&key=d6c9714af1784481affffd3493eff327`),
    //         ]);

    //         // const genresData = genresResponse.data.results || [];
    //         // const platformsData = platformsResponse.data.results || [];
    //         const tagsData = tagsResponse.data.results || [];

    //         // setGenres(genresData.map((item) => item.name));
    //         // setPlatforms(platformsData.map((item) => item.name));
    //         setTags(tagsData.map((item) => item.name));

    //     } catch (error) {
    //         console.error('Ошибка при получении данных:', error);
    //     }
    // };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='column-test'>
            <div>
                <h1>Genres</h1>
                {console.log(genres)}
                {console.log(platforms)}
                {console.log(tags)}
                <ul>
                    {genres.map((genre) => (
                        <li key={genre}>{genre}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Platforms</h1>
                <ul>
                    {platforms.map((platform) => (
                        <li key={platform}>{platform}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Tags</h1>
                <ul>
                    {tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default Test