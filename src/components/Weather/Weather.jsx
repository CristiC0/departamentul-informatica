import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = () => {

    const [weather, setWeather] = useState('');
    const apiKey = "5c3cb960f22d417d48c2ba0092989027";


    useEffect(() => {
        const apiCall = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?id=618426&appid=${apiKey}`;
            const req = axios.get(url);
            const res = await req;
            setWeather({
                temp: res.data.main.temp,
            })
        }
        apiCall();
    },[])

    let k = weather.temp;
    let C = k - 273.15

    return <div>
        <div className="Weath">
            <div className="welement">
                {C.toFixed(0)} &#8451;
            </div>
        </div>
    </div>
}

export default Weather;