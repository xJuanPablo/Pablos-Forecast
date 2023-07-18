
// variables for HTML
const inputValue = document.querySelector('.inputValue')
let button = document.querySelector('.button');


let weatherTemps = document.querySelectorAll('.temp')
let icons = document.querySelectorAll('.icon')
let wind = document.querySelectorAll(`.wind`)
let humidity = document.querySelectorAll('.humidity')
let dt = document.querySelectorAll('.dt')



button.addEventListener('click', () => {
  
  
  // Later Update
  /*
  let DD = '';
  let options = document.querySelectorAll('.option')
  
   for (let i =0; i < options.length; i++){
   options[i].addEventListener('click', (e) =>{
      DD = `,${e.target.value}`;
      console.log(DD)
    })
  }*/
  
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue.value}&limit=5&appid=26f05dc9059defba61a81f1cbd6b1f02`)
  .then(function(response) {
    return response.json();
  })
  .then(function (data){
    console.log(data)
    let lat = data[0].lat;
    let lon = data[0].lon;
    let name = data[0].name;
    console.log(lat)
    console.log(lon)
    getWeatherAPI(lat, lon)

    cityName.textContent = name;
  })
  
  function getWeatherAPI(lat, lon) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=26f05dc9059defba61a81f1cbd6b1f02&units=imperial`)
    .then(function(answer) {
      return answer.json();
    })
    .then(function (value){
      console.log(value)


for (let i =0; i < weatherTemps.length; i++){
weatherTemps[i].textContent = value.daily[i].temp.day
icons[i].src = icon(value.daily[i].weather[0].icon)
wind[i].textContent = `Wind Speed: ${value.daily[i].wind_speed} MPH`
humidity[i].textContent = `Humidity: ${value.daily[i].humidity}`
dt[i].textContent = adjustDate(value.daily[i].dt)
}


})
}
})



function adjustDate(uni) {
  let date = ``;
  date = dayjs.unix(uni).format('MM/DD/YYYY')
  return date;
}




function icon(icon){
  let image = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return image;
}


