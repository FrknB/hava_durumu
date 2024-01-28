/*  !!!!!
    The website from which I got the API
    https://collectapi.com/tr/

*/

const today = new Date();
const day = (today.getDate() < 10) ? "0" + today.getDate()
                                   : today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
let monthName;
switch (month) {
    case 0:
        monthName = "Ocak";
        break;
    case 1:
        monthName = "Şubat";
        break;
    case 2:
        monthName = "Mart";
        break;
    case 3:
        monthName = "Nisan";
        break;
    case 4:
        monthName = "Mayıs";
        break;
    case 5:
        monthName = "Haziran";
        break;
    case 6:
        monthName = "Temmuz";
        break;
    case 7:
        monthName = "Ağustos";
        break;
    case 8:
        monthName = "Eylül";
        break;
    case 9:
        monthName = "Ekim";
        break;
    case 10:
        monthName = "Kasım";
        break;
    case 11:
        monthName = "Aralık";
        break;
    default:
        monthName = "Bilinmeyen Ay";
}

const cityInput = document.getElementById("cityInput");
const btn = document.getElementById("handleClick");
const derece = document.getElementById("derece");
const sehirbilgi = document.getElementById("sehirbilgi");
const countryName = document.getElementById("countryName");
const dateArea = document.getElementById("dateArea");
const degstatu = document.getElementById("degstatu");
const deg = document.getElementById("degree");
const description = document.getElementById("description");
const contentYear = document.getElementById("content-year");
const contentTime = document.getElementById("content-time");
const area3 = document.getElementById("area3");
const dayimg = document.getElementById("dayimg");

btn.addEventListener("click", () => {
    const token = "YOUR API KEY";
    const apiUrl = `https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${cityInput.value}`;

    dateArea.innerText = day + " " + monthName + " " + year;
    contentTime.innerText = day + " " + monthName + " " + year;
    contentYear.innerText = monthName + " " + year;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            countryName.innerText = data.city;
            degstatu.src = data.result[0].icon;
            deg.innerHTML = data.result[0].degree + " " + "&deg;C";
            description.innerText = data.result[0].description;

            const arrayLength = data.result.length;
            console.log(arrayLength);
            area3.innerHTML = "";

            for (i = 0; i < arrayLength; i++) {
                console.log(data.result[i]);
                
            const area3Child = document.createElement("div");
            area3Child.className= "days";
                area3Child.innerHTML = `
                <div class="day">
                    <span id="dayName">${data.result[i].day}</span>
                    <img src="${data.result[i].icon}" id="dayimg">
                    <h1 id="daydeg">${data.result[i].degree} &deg;</h1>
                </div>
            `;
            area3.classList = "area3";
            area3.appendChild(area3Child);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

/* scrollbar switch */
let isDragging = false;
let startX;
let scrollLeft;

document.getElementById('area3').addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - document.getElementById('area3').offsetLeft;
    scrollLeft = document.getElementById('area3').scrollLeft;
    document.getElementById('area3').style.cursor = 'grabbing';
});

document.getElementById('area3').addEventListener('mouseup', () => {
    isDragging = false;
    document.getElementById('area3').style.cursor = 'grab';
});

document.getElementById('area3').addEventListener('mouseleave', () => {
    isDragging = false;
    document.getElementById('area3').style.cursor = 'grab';
});

document.getElementById('area3').addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - document.getElementById('area3').offsetLeft;
    const walk = (x - startX) * 3; // Ayarlanabilir hız
    document.getElementById('area3').scrollLeft = scrollLeft - walk;
});