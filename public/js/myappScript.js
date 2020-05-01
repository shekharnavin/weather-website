// console.log("Client side javascript is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// }).catch((error)=>{
//     console.log(error);
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let paragraph = document.querySelector("p");
paragraph.innerHTML = "";
let displayAddress = document.getElementById("displayAddress"); 
displayAddress.innerHTML = "";

paragraph.innerHTML =  `<h4>Please find the weather report for provided location: ${search.value}!!!</h4>` 

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();    
    fetch('http://localhost:3000/weather?address=' + search.value + "'").then((response)=>{
        response.json().then((data)=>{
            displayAddress.innerHTML += `<h2>Place: ${data.location}</h2>`;
            displayAddress.innerHTML += `<h3>${data.forcast}<\h3>`; 
        })
    }).catch((error)=>{
        console.log(error);
    });    
});
