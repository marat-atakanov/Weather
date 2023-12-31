import React, {useState} from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState("Bishkek")

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&untis=metric&lang=ru&appid=5a66bf1c19fe24223d418a534734a2cc`

    const searchLocation = (event) => {
        console.log(event.key);
        if (event.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data);
            })
            setLocation("");
            console.log(data)
        }
    }

    return (
        <div className="app">
            <div className="search">
                <input
                    type="text"
                    value={location}
                    onChange={(event) => {
                        setLocation(event.target.value)
                    }}
                    onKeyPress={searchLocation}
                    placeholder="Введите название"
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>
                            {data.name}
                        </p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed() - 273} {'\u00b0'}C</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].description}</p> : null}
                    </div>
                </div>

                {data.name !== undefined && (
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? (
                                <p className="bold">{data.main.feels_like.toFixed() - 273} {'\u00b0'}C</p>
                            ) : null}
                            <p>Чувствуется как</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                            <p>Влажность</p>
                        </div>
                        <div className="wind">
                            {data.wind ? (
                                <p className="bold">{data.wind.speed.toFixed()} м/с</p>
                            ) : null}
                            <p>Скрость ветра</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;