import React, { useState, useEffect } from 'react';

function Home() {
    const [count, setCount] = useState(0);

    // Аналогично componentDidMount и componentDidUpdate:
    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        document.title = `Вы нажали ${count} раз`;
        console.log("effect")
    });

    return (
        <div>
            <p>Вы нажали {count} раз</p>
            <button onClick={() => console.log("test")}>
                Нажми на меня
            </button>
        </div>
    );
}

export default Home