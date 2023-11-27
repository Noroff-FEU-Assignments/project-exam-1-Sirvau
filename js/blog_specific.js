const loader = document.querySelector(".loader");

async function getPostIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
}

async function fetchSpecificPost() {
    try {
        const postId = await getPostIdFromQuery();
        const urlSpecificPost = `https://christmas-blog.siril-vaular.no/wp-json/wp/v2/posts/${postId}`;
        const corsEnabledUrlSpecificPost = "https://noroffcors.onrender.com/" + urlSpecificPost;

        loader.style.display = "block";
        const response = await fetch(corsEnabledUrlSpecificPost);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const postDetail = await response.json();
        loader.style.display = "none";

        return postDetail;
    } catch (error) {
        console.error("Error fetching data:", error);
        loader.style.display = "none";
    }
}

async function displaySpecificPost() {
    try {
        const post = await fetchSpecificPost();

        if (!post) {
            throw new Error("Unfortunately, none of the posts were found.");
        } else {
            const postDetail = post;

            const imageContainer = document.querySelector("#specific_post_image_container");
            const headerAndTextContainer = document.querySelector(".specific_post_header_and_text_container");
            
            const postSpecificImage = document.createElement("img");
            postSpecificImage.classList.add("post_specific_image" ,"hero_image", "background_images");
            postSpecificImage.src = `${postDetail.jetpack_featured_media_url}`;
            postSpecificImage.alt = "Featured Image";
            
            const postTitle = document.createElement("h1");
            postTitle.classList.add("post_title", "text_formatting");
            postTitle.innerHTML = `${postDetail.title.rendered}`;
            
            const postBodyText = document.createElement("p");
            postBodyText.classList.add("body_text");
            postBodyText.innerHTML = `${postDetail.content.rendered}`;
            
            imageContainer.appendChild(postSpecificImage);
            headerAndTextContainer.appendChild(postTitle);
            headerAndTextContainer.appendChild(postBodyText);
            
        }
    } catch (error) {
        console.error("Error fetching specific post:", error);
    }
}


displaySpecificPost();
