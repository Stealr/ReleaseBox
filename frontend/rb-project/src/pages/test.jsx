import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";


function Test() {
    // const API_URL = "http://127.0.0.1:8000/api/students/"
    // console.log("test")
    // axios.get('http://localhost:8000')

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/.../')
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
                {data.map(item => (
                    <li key={item.id}>{item}</li> // замените на соответствующие поля
                ))}
            </ul>
        </div>
    )
}

export default Test