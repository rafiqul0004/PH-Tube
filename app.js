const loadData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.data.length == 0) {
                displayMessage();
            }
            else {
                displayData(data.data);
            }
        });
};


// sort and display the sort data
const sortData = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1000")
        .then((res) => res.json())
        .then((data) => {
            const sortedData = sortCategories(data.data);
            displayData(sortedData);
        });
};


// sorting category data part for sort button
const sortCategories = (data) => {
    const parseValue = (str) => {
        const numericPart = parseFloat(str);
        const multiplier = str.includes("K") ? 1000 : str.includes("M") ? 1000000 : 1;
        return numericPart * multiplier;
    };

    const customSort = (a, b) => {
        const aData = parseValue(a.others.views);
        const bData = parseValue(b.others.views);
        return bData - aData;
    };

    return data.sort(customSort);
};



// all data displaying part
const displayData = (data) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ''; // making innerHTML null

    data.forEach((video) => {
        const card = document.createElement("div");
        card.classList.add("box");

        const postedDate = calculateTime(video.others.posted_date);

        card.innerHTML = `
            <div>
            <img class="img-box" src="${video?.thumbnail}" alt="Thumbnail">
            ${postedDate ? `<p class="text-end date-ago">${postedDate}</p>` : ''}
            </div>
            <div class="profile-info">
                <img class="author-profile" src="${video.authors[0].profile_picture}" alt="Author Profile">
                <h5>${video.title}</h5>
            </div>
            <div class="video-info">
            <div class="profile-verified">
                <p>${video.authors[0].profile_name}</p>
                ${video.authors[0].verified ? '<i class="bi bi-patch-check-fill text-primary"></i>' : ''}
            </div>
                <p>${video.others.views} views</p>
            </div>
        `;

        videoContainer.appendChild(card);
    });
};



// No content showing part
const displayMessage = () => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ` 
    <div class="display-message">
    <img src="resources/Icon.png" alt="logo">
    <h1>Oops!! Sorry, There is no content here</h1>
    </div>`;
};


// seconds to time caculation
const calculateTime = (timestamp) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);

    return hours > 0 ? `${hours} hours ${minutes} minutes ago` :'';
};


// Category Selection part
document.getElementById("all-category").addEventListener("click", () => loadData(1000));
document.getElementById("music-category").addEventListener("click", () => loadData(1001));
document.getElementById("comedy-category").addEventListener("click", () => loadData(1003));
document.getElementById("drawing-category").addEventListener("click", () => loadData(1005));


// sorting data showing part
document.getElementById("sort-by-view").addEventListener("click",sortData);

loadData(1000);
