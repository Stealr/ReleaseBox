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
            

            {/* {data.map(item => (
                <div>
                    {item.name}
                    {item.released}
                </div>
            ))} */}

        </div>
    )
}

export default Test