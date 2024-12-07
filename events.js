/*const apiKey = import.meta.env.VITE_API_KEY;
const searchEngineId = import.meta.env.VITE_SEARCH_ENGINE_ID;*/

const apiKey = "";
const searchEngineId = "";

let query = "conservation events near Chicago"; 
let startIndex = 1; 

//Function to fetch events
async function fetchEvents() {
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "<li>Loading events...</li>";

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${searchEngineId}&key=${apiKey}&start=${startIndex}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        displayEvents(data.items || []);
    } catch (error) {
        console.error("Error fetching events:", error);
        eventsList.innerHTML = "<li>Error fetching events. Please try again later.</li>";
    }
}

//Function to handle search by location
function searchByLocation() {
    const locationInput = document.getElementById("location-input").value.trim();
    if (locationInput) {
        query = `conservation events near ${locationInput}`;
        startIndex = 1;
        fetchEvents();
    } else {
        alert("Please enter a location");
    }
}

//Pagination functions
function loadNextPage() {
    startIndex += 5;
    fetchEvents();
}

function loadPreviousPage() {
    startIndex = Math.max(1, startIndex - 5);
    fetchEvents();
}

//Function to display events
function displayEvents(items) {
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";

    const eventsToDisplay = items.slice(0, 5);

    if (eventsToDisplay.length === 0) {
        eventsList.innerHTML = "<li>No events found.</li>";
        return;
    }

    eventsToDisplay.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <a href="${item.link}" target="_blank">${item.title}</a>
            <p>${item.snippet}</p>
        `;
        eventsList.appendChild(listItem);
    });
}

fetchEvents();