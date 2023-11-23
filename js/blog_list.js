
const urlAllPosts = "https://christmas-blog.siril-vaular.no/wp-json/wp/v2/posts?per_page=20";
const corsEnabledUrlAllPosts = "https://noroffcors.onrender.com/" + urlAllPosts;


const loader = document.querySelector(".loader");

export async function getAllPosts() {
    try {
        loader.style.display = "block";
        const response = await fetch(corsEnabledUrlAllPosts);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();
        loader.style.display = "none";

        return posts;
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

        const focusImage = document.createElement("img");
        focusImage.classList.add("focus_image");
        focusImage.src = post.jetpack_featured_media_url;
        focusImage.alt = "Featured Image";

        const focusTitle = document.createElement("h2");
        focusTitle.classList.add("focus_title");
        focusTitle.textContent = `${post.title.rendered}`;

        const focusExcerpt = document.createElement("p");
        focusExcerpt.classList.add("body_text", "focus_text");
        focusExcerpt.innerHTML = post.excerpt.rendered;

        const focusButton = document.createElement("button");
        focusButton.classList.add("focus_button", "button_text");
        focusButton.addEventListener("click",()=> {
            window.location.href=`html/blog_specific.html?id=${post.id}&title=${post.title.rendered}`;
        });

        focusButton.innerHTML = ("Read more");


        focusPostContainer.appendChild(focusImage);
        focusPostContainer.appendChild(focusTitle);
        focusPostContainer.appendChild(focusExcerpt);
        focusPostContainer.appendChild(focusButton);
    } catch (error) {
        console.error("Error fetching focus post:", error);
    }
}

displayFocusPost();



/*All posts*/

async function displayAllPosts() {
    try {
        const posts = await getAllPosts();

        if (!posts) {
            throw new Error("Unfortunately, none of the posts were found.");
        }

        const allPostsContainer = document.querySelector(".all_posts_container");

        posts.forEach((post, index) => {
            if (index === 0) {
                return;
            }

            const eachPostContainer = document.createElement("div");
            eachPostContainer.classList.add("each_post_container");

            const featuredImage = document.createElement("img");
            featuredImage.classList.add("featured_image");
            featuredImage.src = post.jetpack_featured_media_url;
            featuredImage.alt = "Featured Image";

            const postTitle = document.createElement("h2");
            postTitle.classList.add("post_title");
            postTitle.textContent = `${post.title.rendered}`;

            const postExcerpt = document.createElement("p");
            postExcerpt.classList.add("body_text");
            postExcerpt.innerHTML = post.excerpt.rendered;

            const postButton = document.createElement("button");
            postButton.classList.add("post_button", "button_text");
            postButton.addEventListener("click",()=> {
                window.location.href=`html/blog_specific.html?id=${post.id}&title=${post.title.rendered}`;
            });
            postButton.innerHTML = ("Read more");
            

            allPostsContainer.appendChild(eachPostContainer);
            eachPostContainer.appendChild(featuredImage);
            eachPostContainer.appendChild(postTitle);
            eachPostContainer.appendChild(postExcerpt);
            eachPostContainer.appendChild(postButton);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

displayAllPosts();



/* Songverses array*/ 
const songVerses = [
    '"Have yourself a merry little Christmas, Let your heart be light"',
    '"...and the thing that will make them ring, is the carol that you sing, right within your heart"',
    '"It\'s the best time of the year. I don\'t know if there will be snow, but have a cup of cheer"'
];
