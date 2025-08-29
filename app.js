let API_KEY = "b9a757423a9f4edd83e105019252808"
let city = "Rawalpindi"
let btn = document.querySelector(".btn")
let search = document.querySelector(".bar")
let data, responce, url, ch = false;
let hour = document.querySelector(".hour-cards")
let week = document.querySelector(".week-cards")
let change = document.querySelector(".change")

let day = document.createElement("div")


let week_data = []

change.addEventListener("click", ()=>{
    ch = !ch;   
    change.innerText = ch ? "Switch to °C" : "Switch to °F";
    if(data){   
        hour.innerHTML = "";
        week.innerHTML = "";
        week_data = [];
        dayinfo();
    }
})

const dayinfo = ()=>{
    day.classList.add("weather-card")
    hour.append(day)
    day.innerText = (ch ? data.current.temp_f + "°F" : data.current.temp_c + "°C") + "\n" + data.current.condition.text + "\n";
    
    let oldImg = day.querySelector("img");
    if (oldImg) oldImg.remove();
    
    let image = document.createElement("img")
    image.src = "https:" + data.current.condition.icon;
    day.append(image)
    image.style.width = "4rem"

    for (let i = 0; i < data.forecast.forecastday.length; i++) {
    week_data.push(data.forecast.forecastday[i]);
    let weekData = document.createElement("div")
    weekData.classList.add("weather-card")
    weekData.innerText = week_data[i].date + "\n" + (ch ? week_data[i].day.avgtemp_f + "°F" : week_data[i].day.avgtemp_c + "°C") + "\n" + week_data[i].day.condition.text;
    week.append(weekData)
    let image1 = document.createElement("img")
    image1.src = "https:" + week_data[i].day.condition.icon;
    weekData.append(image1)
    image1.style.width = "4rem"
}
    document.querySelector(".avg").innerText = "7-Day Forecast: Average temperature Shown!"
}


const getData = async () =>{
    btn.addEventListener("click", async () =>{
        if(search.value !== ""){
        city = search.value;
        url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;

        responce = await fetch(url)
        data = await responce.json();

        console.log(city);
        console.log(data.location.name);

        day.innerHTML = "";
        day.innerText = (ch ? data.current.temp_f + "°F" : data.current.temp_c + "°C") + "\n" + data.current.condition.text + "\n";
        
        hour.innerHTML = "";
        week.innerHTML = "";
        week_data = [];

        dayinfo()
        
        }
        else{
            alert(`Please Enter a City Name`);
        }
    })
}


getData()
