
const urlAllPosts = "https://christmas-blog.siril-vaular.no/wp-json/wp/v2/posts";

const corsEnabledUrl = "https://noroffcors.onrender.com/" + urlAllPosts;

async function getPosts() {
    const response = await fetch(corsEnabledUrl);
    const results = await response.json();
    console.log(results);
}

getPosts();