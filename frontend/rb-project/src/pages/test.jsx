import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";


function Test() {
    // const API_URL = "http://127.0.0.1:8000/api/students/"
    // console.log("test")
    // axios.get('http://localhost:8000')

    // const [data, setData] = useState([{}]);

    // axios.get('http://localhost:8000/games/')
    // .then(response => {
    //     setData(response.data);
    // })
    // .catch(error => {
    //     console.error(error);
    // });

    // useEffect(() => {

    // }, []);

    const sendData = async (data) => {
        try {
            console.log("after in")
            const response = await axios.post('http://localhost:8000/games/addToCollection/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("in func ")
        }
        catch (error) {
            console.log('Error ', error.response)
        }

    }

    const sendData_reg = async (data) => {
        try {
            console.log("after in")
            const response = await axios.post('http://localhost:8000/register/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("in func ")
        }
        catch (error) {
            console.log('Error ', error.response)
        }

    }

    console.log("out func ")
    const data = { 'username': 'newuser2', 'email': 'email@gmail.com', 'password': '5dads23', 'userCollections': {} }

    // sendData({ 'user_id': 2, 'collection_name': 'Done', 'gameId': 523})
    // sendData_reg({ 'username': 'newuser', 'email': 'email@gmail.com', 'password': '5dads23', 'userCollections': {}})

    return (
        <div>
            <h1>Data from Django</h1>
            <button onClick={() => sendData_reg(data)} > test button</button>
            {/* <ul>
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
            {console.log("test")} */}
        </div>
    )
}

export default Test