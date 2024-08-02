import React, { useEffect, useState } from 'react';

const App = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://13.213.1.218/predict/1');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Data from Flask API</h1>
            <ul>
                {Object.entries(data).map(([date, value]) => (
                    <li key={date}>{`${date}: ${value}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
