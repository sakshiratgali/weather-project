function hide(){
    document.querySelector("#a").style.display="flex"
    document.querySelector("#b").style.display="none"
}

function show(){
    document.querySelector("#a").style.display="none"
    document.querySelector("#b").style.display="flex"
}
var button=document.querySelector("#button")
var city=document.querySelector("#city")
var title=document.querySelector("#title")
var description=document.querySelector("#description")
var humidity=document.querySelector("#humidity")

async function weather(city){
    const key="0da73395e2b62106fea544f0edd84125"
    const api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0da73395e2b62106fea544f0edd84125`
    const data= await fetch(api).then(response=> response.json());

    if(data.cod===401){
        console.log("error FOund");
        return;
    }

    title.innerHTML=city;
    description.innerHTML=data.weather[0].description;
    humidity.innerHTML=data.main.humidity+'%';

}
button.addEventListener("click",()=>{
    weather(city.value)

})

