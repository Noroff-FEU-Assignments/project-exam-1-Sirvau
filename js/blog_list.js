let posts; 

/*Fetching all posts from API*/
const urlAllPosts = "https://christmas-blog.siril-vaular.no/wp-json/wp/v2/posts?per_page=30";
const corsEnabledUrlAllPosts = "https://noroffcors.onrender.com/" + urlAllPosts;

const loader = document.querySelector(".loader");

export async function getAllPosts() {
    try {
        loader.style.display = "block";
        const response = await fetch(corsEnabledUrlAllPosts);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchedPosts = await response.json();
        loader.style.display = "none";

        return fetchedPosts;
    } catch (error) {
        console.error("Error fetching data:", error);
        loader.style.display = "none";
    }
}


/*Focus post*/

async function displayFocusPost() {
    try {
        const posts = await getAllPosts();
        const post = posts[0];

        if (!post) {
            throw new Error("Unfortunately, this post was not found.");
        }

        const focusPostContainer = document.querySelector(".focus_post_container");

        const focusImageAndTextContainer = document.createElement("div");
        focusImageAndTextContainer.classList.add("focus_image_and_text_container");

        const focusPostText = document.createElement("div");
        focusPostText.classList.add("focus_post_text_container");

        const focusImage = document.createElement("img");
        focusImage.classList.add("focus_image");
        focusImage.src = `${post.jetpack_featured_media_url}`;
        focusImage.alt = "Featured Image";

        const focusTitle = document.createElement("h2");
        focusTitle.classList.add("focus_title");
        focusTitle.textContent = `${post.title.rendered}`;

        const focusExcerpt = document.createElement("p");
        focusExcerpt.classList.add("body_text", "focus_text");
        focusExcerpt.innerHTML = `${post.excerpt.rendered}`;

        const focusButtonContainer = document.createElement("div");
        focusButtonContainer.classList.add("focus_button_container");
       

        const focusButton = document.createElement("button");
        focusButton.classList.add("focus_button", "button_text");
        focusButton.addEventListener("click",()=> {
            window.location.href=`blog_specific.html?id=${post.id}&title=${post.title.rendered}`;
        });

        focusButton.innerHTML = ("Read more");

        focusPostContainer.appendChild(focusImageAndTextContainer);
        focusPostContainer.appendChild(focusButtonContainer);
        focusImageAndTextContainer.appendChild(focusImage);
        focusImageAndTextContainer.appendChild(focusPostText);
        focusPostText.appendChild(focusTitle);
        focusPostText.appendChild(focusExcerpt);
        focusButtonContainer.appendChild(focusButton);
    } catch (error) {
        console.error("Error fetching focus post:", error);
    }
}

displayFocusPost();





//Creating cards and displaying them with a songverse after every third card 

const cardContainer = document.querySelector(".card_container_of_posts");
const loadMoreButton = document.getElementById("load_more");
const cardCountElem = document.getElementById("card_count");
const cardTotalElem = document.getElementById("card_total");

const cardLimit = 20;
const cardIncrease = 10;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

cardTotalElem.innerHTML = cardLimit;

const handleButtonStatus = () => {
    if (pageCount === currentPage) {
        loadMoreButton.classList.add("disabled");
        loadMoreButton.setAttribute("disabled", true);
    }
};


const createCard = (post, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const featuredImage = document.createElement("img");
    featuredImage.classList.add("featured_image");
    featuredImage.src = `${post.jetpack_featured_media_url}`;
    featuredImage.alt = `${post.title.rendered}`;

    const postTitle = document.createElement("h2");
    postTitle.classList.add("post_title");
    postTitle.textContent = `${post.title.rendered}`;

    const postExcerpt = document.createElement("p");
    postExcerpt.classList.add("body_text");
    postExcerpt.innerHTML = `${post.excerpt.rendered}`;

    const postButton = document.createElement("button");
    postButton.classList.add("post_button", "button_text");
    postButton.addEventListener("click", () => {
        window.location.href=`blog_specific.html?id=${post.id}&title=${post.title.rendered}`;
    });
    postButton.innerHTML = "Read more";

    cardContainer.appendChild(card);
    card.appendChild(featuredImage);
    card.appendChild(postTitle);
    card.appendChild(postExcerpt);
    card.appendChild(postButton);


    //Adding a songverse after every third post
    const songVerses = [
        '"Have yourself a merry little Christmas, Let your heart be light"',
       '"...and the thing that will make them ring, is the carol that you sing, right within your heart"',
      '"It\'s the best time of the year. I don\'t know if there will be snow, but have a cup of cheer"', '"All the lights are shining so brightly everywhere And the sound of Children\'s laughter fills the air"', '"Sleigh bells ring, are you listening, In the lane, snow is glistening"', '"Jingle bells, jingle bells, Jingle all the way! Oh what fun it is to ride in a one-horse open sleigh"', '"Rockin` around the Christmas tree, let the Christmas spirit ring. Later we\'ll have some pumpkin pie and we\'ll do some caroling"'
     ];
     

     if ((index + 1) % 3 === 0 && index !== 0) {
        const verseCard = document.createElement("div");
        verseCard.className = "card song_verse_card";

        const verseText = document.createElement("p");
        verseText.classList.add("text_formatting","song_citation");
        verseText.textContent = songVerses[(index + 1) / 3 - 1];

        cardContainer.appendChild(verseCard);
        verseCard.appendChild(verseText);
    }

    cardContainer.appendChild(card);
};


const addCards = (pageIndex) => {
    currentPage = pageIndex;

    handleButtonStatus();

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange =
        pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;

    cardCountElem.innerHTML = endRange;

    for (let i = startRange; i < endRange; i++) {
        createCard(posts[i], i); 
    }
   
};

window.onload = async function () {
    try {
        posts = await getAllPosts();
        addCards(currentPage);
        loadMoreButton.addEventListener("click", () => {
            addCards(currentPage + 1);
        });
    } catch (error) {
        console.error("Error loading posts:", error);
    }
};


