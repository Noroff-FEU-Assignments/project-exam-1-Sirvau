const urlLatestPosts = "https://christmas-blog.siril-vaular.no/wp-json/wp/v2/posts?per_page=6&order_by=date";
const corsEnabledUrlLatestPosts = "https://noroffcors.onrender.com/" + urlLatestPosts;
const loader = document.querySelector(".loader");


//API call latest posts
export async function getLatestPosts() {
    try {
        loader.style.display = "block";
        const response = await fetch(corsEnabledUrlLatestPosts);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();
        loader.style.display = "none";
        displayLatestPosts(posts);
    } catch (error) {
        console.error("Error fetching data:", error);
        loader.style.display = "none";
    }
}

//Display latest posts in a carousel
function displayLatestPosts(posts) {
    const slidesContainer = document.querySelector(".slides_container");

    posts.forEach((post) => {
        const slide = document.createElement("li");
        slide.classList.add("slide");

        const postLink = document.createElement("a");
        postLink.classList.add("post_link");
        postLink.href = `html/blog_specific.html?id=${post.id}&title=${post.title.rendered}`;

        const featuredImageElement = document.createElement("img");
        featuredImageElement.classList.add("featured_image");
        featuredImageElement.src = post.jetpack_featured_media_url;
        featuredImageElement.alt = "Featured Image";

        const titleElement = document.createElement("h2");
        titleElement.classList.add("post_title");
        titleElement.textContent = `${post.title.rendered}`;

        postLink.appendChild(featuredImageElement);
        postLink.appendChild(titleElement);
        slide.appendChild(postLink);
        slidesContainer.appendChild(slide);
    });

    //Event listeners for navigation
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector("#slide_arrow_prev");
    const nextButton = document.querySelector("#slide_arrow_next");

    nextButton.addEventListener("click", () => {
        const slideWidth = slides[0].clientWidth; 
        slidesContainer.scrollLeft += slideWidth;
    });

    prevButton.addEventListener("click", () => {
        const slideWidth = slides[0].clientWidth; 
        slidesContainer.scrollLeft -= slideWidth;
    });
}

getLatestPosts();



//Christmas countdown

const countDownDate = new Date("Dec 24, 2023 00:00:01").getTime();
const countdownContainer = document.querySelector(".christmas_countdown_container");
const daysElement = document.createElement("span");
const hoursElement = document.createElement("span");
const minutesElement = document.createElement("span");
const secondsElement = document.createElement("span");
const christmasCountdownText = document.createElement("p");

daysElement.className = "christmas_countdown_clock";
hoursElement.className = "christmas_countdown_clock";
minutesElement.className = "christmas_countdown_clock";
secondsElement.className = "christmas_countdown_clock";

countdownContainer.appendChild(daysElement);
countdownContainer.appendChild(hoursElement);
countdownContainer.appendChild(minutesElement);
countdownContainer.appendChild(secondsElement);
countdownContainer.appendChild(christmasCountdownText);

const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);


  daysElement.textContent = days + " d ";
  hoursElement.textContent = " - " + hours + " h ";
  minutesElement.textContent = " - " + minutes + " m ";
  secondsElement.textContent = " - " + seconds + " s ";
  christmasCountdownText.className = "christmas_countdown_text";
  christmasCountdownText.textContent = "Until Christmas";

  // Countdown finish message
  if (distance < 0) {
    clearInterval(x);
    countdownContainer.textContent = "Christmas was here";
    christmasCountdownText.textContent = "";
  }
}, 1000);
