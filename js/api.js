const urlAllPosts = "https://christmas-blog.siril-vaular.no/wp-json/wp/v2/posts";
const corsEnabledUrlAllPosts = "https://noroffcors.onrender.com/" + urlAllPosts;

export async function getAllPosts() {
    try {
        const response = await fetch(corsEnabledUrlAllPosts);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const results = await response.json();
        console.log(results);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getAllPosts();


