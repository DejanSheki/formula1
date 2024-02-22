const key = '111';
const circuits = document.querySelector('.circuits-container');
const driversContainer = document.querySelector('.drivers-container');
const drivers = document.querySelector('.drivers-list');
const firstDriver = document.querySelector('.first-driver');
const constructorsConatiner = document.querySelector('.constructors-container')
const constructors = document.querySelector('.constructors-list');
const firstConstructor = document.querySelector('.first-constructor');
let fetchLink;
let value;
let valueConstr;

let d = new Date();
let y = d.getFullYear();

async function fetchApi(url) {
    const dataFetch = await fetch(url); //test
    const data = await dataFetch.json();
    return data;
}

// All circuit
async function fetchCircuits() {
    const dataCircuits = await fetch('https://api-formula-1.p.rapidapi.com/circuits', {
        'method': 'GET',
        'headers': {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "api-formula-1.p.rapidapi.com"
        }
    });
    const data = await dataCircuits.json();
    console.log(data);
    generateCircuits(data);
}
fetchCircuits();

function generateCircuits(data) {
    // remove bad items from API data
    var arr = data.response;
    var idsToDelete = [3, 24, 26, 29];
    const myData = arr.map((element, index) => {
        return arr[index] = idsToDelete.includes(element.id) ? undefined : arr[index]
    }).filter(element => element);

    myData.forEach(result => {
        const circuitWrap = document.createElement('div');
        circuitWrap.classList.add('circuit-wrap');
        circuitWrap.innerHTML = `
        <h2>${result.competition.name}</h2>
        <div><img src='${result.image}'></div>
        <div>
        <b>${result.competition.location.city}, </b>
        <b>${result.competition.location.country}</b>
        <p>Circuit Length:<span> ${result.length}</span></p>
        <p>First Grand Prix:<span> ${result.opened}</span></p>
        <p>Capacity:<span> ${result.capacity}</span></p>
        </div>
        `;
        circuits.appendChild(circuitWrap);
    });
}

// Drivers

function clear() {
    drivers.innerHTML = '';
    firstDriver.innerHTML = '';
}
function clearConstructors() {
    constructors.innerHTML = '';
    firstConstructor.innerHTML = '';
}

document.addEventListener('click', (e) => {
    if (e.target.parentNode.className === 'driv') {
        const year = document.querySelector('.year');
        value = e.target.value;
        year.innerText = value;
        clear();
        fetchDrivers(value);
    }
    if (e.target.parentNode.className === 'constr') {
        const yearConstr = document.querySelector('.yearConstr');
        valueConstr = e.target.value;
        yearConstr.innerText = valueConstr;
        clearConstructors();
        fetchConstructor(valueConstr);
    }
})

async function fetchDrivers(value = y) {
    fetchLink = `https://ergast.com/api/f1/${value}/driverstandings.json`;
    const data = await fetchApi(fetchLink);
    const driversData = await data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    generateDrivers(driversData);
    console.log(driversData);

}
fetchDrivers();


function generateDrivers(driversData) {
    driversData.forEach((result) => {
        if (result.Driver.familyName === "Verstappen") {
            result.img = './images/max.png';
        }
        if (result.Driver.familyName === "Hamilton") {
            result.img = './images/lewis.png';
        }
        if (result.Driver.familyName === "Vettel") {
            result.img = './images/vettel.png';
        }
        if (result.Driver.familyName === "Rosberg") {
            result.img = './images/rosberg.png';
        }
        if (result.Driver.familyName === "Schumacher") {
            result.img = './images/Schumacher.png';
        }
        if (result.Driver.familyName === "Alonso") {
            result.img = './images/Alonso.png';
        }
        if (result.Driver.familyName === "Button") {
            result.img = './images/Button.png';
        }
        const driversWrap = document.createElement('div');
        driversWrap.classList.add('driver');
        driversWrap.innerHTML = `
        <div class="position"><span>${result.position}</span></div>
        <h4>${result.Driver.givenName + " " + result.Driver.familyName}</h4>
        <p>${result.points}</p>
        `;
        drivers.appendChild(driversWrap);
    });
    firstDriver.style.backgroundImage = `url(${driversData[0].img})`;
    firstDriver.appendChild(drivers.children[0]);
}

// Constructors

async function fetchConstructor(valueConstr = y) {
    fetchLink = `https://ergast.com/api/f1/${valueConstr}/constructorStandings.json`;
    const data = await fetchApi(fetchLink);
    const constructorsData = await data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    // console.log(constructorsData);
    generateConstructor(constructorsData);
}
fetchConstructor();

const generateConstructor = (constructorsData) => {
    constructorsData.forEach((result) => {
        const constructorsWrap = document.createElement('div');
        constructorsWrap.classList.add('constructor');
        constructorsWrap.innerHTML = `
        <div class="position"><span>${result.position}</span></div>
        <div class="logo"><p>${result.Constructor.name}</p><img src='${result.logo}'></div>
        <p>${result.points}</p>
        `;
        constructors.appendChild(constructorsWrap);
    });
    firstConstructor.appendChild(constructors.children[0]);
    firstConstructor.style.backgroundImage = `url(${constructorsData[0].logo})`;
}
// function teamData(driversData) {
//     driversData.forEach(result => {
//         if (result.Constructors[0].name.includes("Red Bull")) {
//             result.color = '#0600EF';
//             result.logo = './images/red-bull.png';
//         }
//         if (result.Constructors[0].name.includes("Mercedes")) {
//             result.color = "#00D2BE";
//             result.logo = './images/mercedes.png';
//         }
//         if (result.Constructors[0].name.includes("McLaren")) {
//             result.color = "#FF9800";
//             result.logo = './images/mclaren.png';
//         }
//         if (result.Constructors[0].name.includes("Ferrari")) {
//             result.color = "#DC0000";
//             result.logo = './images/ferrari.png';
//         }
//         if (result.Constructors[0].name.includes("AlphaTauri")) {
//             result.color = "#2B4562";
//             result.logo = './images/alphatauri.png';
//         }
//         if (result.Constructors[0].name.includes("Alpine")) {
//             result.color = "#0090FF";
//             result.logo = './images/alpina.png';
//         }
//         if (result.Constructors[0].name.includes("Aston Martin")) {
//             result.color = "#006F62";
//             result.logo = './images/aston-martin.png';
//         }
//         if (result.Constructors[0].name.includes("Alfa Romeo")) {
//             result.color = "#900000";
//             result.logo = './images/alfa-romeo.png';
//         }
//         if (result.Constructors[0].name.includes("Haas")) {
//             result.color = "#FFFFFF";
//             result.logo = './images/haas.png';
//         }
//         if (result.Constructors[0].name.includes("Williams")) {
//             result.color = "#005AFF";
//             result.logo = './images/williams.png';
//         }
//         if (result.Constructors[0].name.includes("Toro Rosso")) {
//             result.color = "#0000FF";
//         }
//         if (result.Constructors[0].name.includes("Renault")) {
//             result.color = "#FFD800";
//         }
//         if (result.Constructors[0].name.includes("Force India")) {
//             result.color = "#FF5F0F";
//         }
//         if (result.Constructors[0].name.includes("Sauber")) {
//             result.color = "#006EFF";
//         }
//         if (result.Constructors[0].name.includes("Manor")) {
//             result.color = "#323232";
//         }
//         if (result.Constructors[0].name.includes("Lotus")) {
//             result.color = "#FFB800";
//         }
//         if (result.Constructors[0].name.includes("Virgin")) {
//             result.color = "#6f5a9d";
//         }
//         if (result.Constructors[0].name.includes("Hrt")) {
//             result.color = "#B0B1B1";
//         }
//         if (result.Driver.familyName === "Verstappen") {
//             result.img = './images/max.png';
//         }
//         if (result.Driver.familyName === "Hamilton") {
//             result.img = './images/lewis.png';
//         }
//         if (result.Driver.familyName === "Vettel") {
//             result.img = './images/vettel.png';
//         }
//         if (result.Driver.familyName === "Rosberg") {
//             result.img = './images/rosberg.png';
//         }
//     });
// }

