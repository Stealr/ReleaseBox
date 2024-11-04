import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";


function Test() {
    // const API_URL = "http://127.0.0.1:8000/api/students/"
    // console.log("test")
    // axios.get('http://localhost:8000')

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Data from Django</h1>
            <ul>
                {data.map(data => (
                    <li key={data.id}>
                        <h2>{data.name}</h2>
                        <p><strong>Released:</strong> {data.released}</p>
                        <p><strong>Platform:</strong> {data.platform}</p>
                        <p><strong>Dev:</strong></p>
                        <p><strong>Push:</strong></p>
                        <p><strong>Genres:</strong> {data.genres}</p>
                        <br/>
                    </li>
                ))}
            </ul>
            {console.log(data)}
        </div>
    )
}

export default Test