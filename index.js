const API_KEY = `251d544b9a4562f7420b68d4e29d5700`;
const btn = document.querySelector('#btn');

async function weatherAPI(city) {
    // URL WEATHER
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    if(data.cod == 200) {

        document.querySelector('#not_found').style.display = 'none';
        document.querySelector('#content_son').style.display = 'grid';

        let nameCity = document.querySelector('#city');
        let graus = document.querySelector('#graus');
        let description = document.querySelector('#description');
        let humidity = document.querySelector('#humidity');
        let max = document.querySelector('#max');
        let min = document.querySelector('#min');
        let icon_weather = document.querySelector('#icon_weather');
        // let rain = document.querySelector('#rain');
        let wind = document.querySelector('#wind');

        nameCity.innerHTML = data.name;
        graus.innerHTML = `${(data.main.temp)} °C`;
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = `${data.main.humidity}%`;
        max.innerHTML = `${Math.round(data.main.temp_max)} °C`;
        min.innerHTML = `${Math.floor(data.main.temp_min)} °C`;

        let value_wind = Math.round(data.wind.speed * 3.6);
        wind.innerHTML = `${value_wind}km/h`;


        // URL AIR POLLUTION
        const url_air = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        let response = await fetch(url_air)
        let data_air = await response.json();

        let air = data_air.list[0].main.aqi;
        let description_air;

        switch(air) {
            case 1:
                description_air = `Ótimo`;
                break;

            case 2:
                description_air = `Bom`;
                break;

            case 3:
                description_air = `Moderado`;
                break;

            case 4:
                description_air = `ruim`;
                break;

            case 5:
                description_air = `Péssimo`;
                break;
        }

        document.querySelector('#air').innerHTML = description_air;

        if(description.innerHTML == 'chuva fraca' || description.innerHTML == 'chuva moderada') {
            icon_weather.attributes.src.textContent = './background_img/chuva_fraca.png';

        } if(description.innerHTML == 'nuvens quebradas') {
            icon_weather.attributes.src.textContent = './background_img/nuvens-quebradas.png';

        } if(description.innerHTML == 'céu limpo' && data.main.temp <= 22 || description.innerHTML == 'céu pouco nublado' || description.innerHTML == 'nuvens dispersas' && data.main.temp <= 25) {
            icon_weather.attributes.src.textContent = './background_img/nuvensDispersas.png';

        } if(description.innerHTML == 'nublado') {
            icon_weather.attributes.src.textContent = './background_img/nublado.png';

        } if(description.innerHTML == 'céu limpo' && data.main.temp > 22 || description.innerHTML == 'nuvens dispersas' && data.main.temp > 25) {
            icon_weather.attributes.src.textContent = './background_img/nuvens-e-sol.png';

        } if(description.innerHTML == 'céu limpo' && data.main.temp > 27) {
            icon_weather.attributes.src.textContent = './background_img/sol.png';

        }if(description.innerHTML == 'chuva forte') {
            icon_weather.attributes.src.textContent = './background_img/trovoada.png';

        } if(description.innerHTML == 'neve' || description.innerHTML == 'nevoeiro') {
            icon_weather.attributes.src.textContent = './background_img/neve.png';
        }

    } else {

        let input_invalid = document.querySelector('#input_invalid');
        input_invalid.style.display = 'flex';

        setTimeout(() => {
            input_invalid.style.display = 'none';
        }, 1500);
    }
}

btn.addEventListener('click', el => {
    el.preventDefault();

    let input = document.querySelector('#input').value;

    if(input == "") {
        let input_empty = document.querySelector('#input_empty');

        input_empty.style.display = 'flex';

        setTimeout(() => {
            input_empty.style.display = 'none';
        }, 1500);

    } else {
        weatherAPI(input);
    }
});

let width = window.innerWidth;

console.log(`${width}px`);
