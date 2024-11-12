// Variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// API key and endpoints
const API_KEY = "3ff14e77f3ce46beb411d5926d9ed0d5";
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

// Event Listeners
window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchNews(GENERAL_NEWS);
};

generalBtn.addEventListener("click", function() {
    
    newsType.innerHTML = "<h4>General News</h4>";
    fetchNews(GENERAL_NEWS);
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchNews(BUSINESS_NEWS);
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchNews(SPORTS_NEWS);
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchNews(ENTERTAINMENT_NEWS);
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchNews(TECHNOLOGY_NEWS);
});

searchBtn.addEventListener("click", function() {
    if (newsQuery.value) {
        newsType.innerHTML = `<h4>Search: ${newsQuery.value}</h4>`;
        fetchNews(`${SEARCH_NEWS}${encodeURIComponent(newsQuery.value)}&apiKey=${API_KEY}`);
    }
});

// Function to fetch and display news
const fetchNews = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            newsDataArr = data.articles;
            displayNews();
        } else {
            newsdetails.innerHTML = "<h5>No data found.</h5>";
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        console.error("Error fetching data:", error);
    }
};

const displayNews = () => {
    newsdetails.innerHTML = "";
    newsDataArr.forEach((news) => {
        const date = news.publishedAt.split("T")[0];

        const col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement("div");
        card.className = "p-2";

        const image = document.createElement("img");
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage || "placeholder.jpg";  // Use a placeholder image if `urlToImage` is null

        const cardBody = document.createElement("div");

        const newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        const dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date;

        const description = document.createElement("p");
        description.className = "text-muted";
        description.innerHTML = news.description;

        const link = document.createElement("a");
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);
        newsdetails.appendChild(col);
    });
};
