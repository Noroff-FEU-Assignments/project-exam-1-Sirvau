
const urlAllPosts = "https://christmas-blog.siril-vaular.no/wp-json/wp/v2/posts";



async function getPosts() {
    const response = await fetch(urlAllPosts);
    console.log(response);
}


getPosts();