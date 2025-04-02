require('dotenv').config();
const express = require('express');
const axios = require('axios');
<<<<<<< HEAD
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({
     origin: 'http://localhost:3000' 
    })
);

=======
const app = express();
const PORT = process.env.PORT || 3000;
>>>>>>> 8217d16070ea8659fc52de38aaf39891dc411c80
const API_TOKEN = process.env.ACCESS_TOKEN;
const API_BASE_URL = process.env.BASE_URL;
const apiClient = axios.create({
    headers: { Authorization: `Bearer ${API_TOKEN}` }
});
app.get('/users/top', async(req,res)=>{
    try{
        console.log("Retrieving user list...");
        const{data:users}=await apiClient.get(`${API_BASE_URL}/users`);      
        const postCounts = await Promise.all(Object.entries(users).map(async ([userId, name]) => {
            console.log(`Fetching posts for user: ${name} (ID: ${userId})`);
            const{data: posts}=await apiClient.get(`${API_BASE_URL}/users/${userId}/posts`);
            return{user_id:userId,name,post_count:posts.length};
        }));
        const topUsers=postCounts.sort((a,b)=>b.post_count-a.post_count).slice(0, 5);
        res.json({top_users:topUsers});
    } catch (error) {
        console.error("error Come:", error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});
app.get('/posts', async (req, res) => {
    const { type} = req.query;
    if (!['popular', 'latest'].includes(type)) {
        return res.status(400).json({ error: "Invalid type. Use 'popular' or 'latest'." });
    }try {
        console.log("Fetching users...");
        const { data: users } = await apiClient.get(`${API_BASE_URL}/users`);
        
        let allPosts = await Promise.all(Object.keys(users).map(async (userId) => {
            console.log(`Retrieving posts for user ID: ${userId}`);
            const{data:posts}=await apiClient.get(`${API_BASE_URL}/users/${userId}/posts`);
            return posts;
        }));allPosts=allPosts.flat();
        if (type === 'latest') {
            return res.json({ latest_posts: allPosts.sort((a, b) => b.id - a.id).slice(0, 5) });
        }

        if (type === 'popular') {
            const postsWithComments = await Promise.all(allPosts.map(async (post) => {
                console.log(`Fetching comments for post ID: ${post.id}`);
                const { data: comments } = await apiClient.get(`${API_BASE_URL}/posts/${post.id}/comments`);
                return { ...post, comment_count: comments.length };
            }));   
            const maxComments = Math.max(...postsWithComments.map(p => p.comment_count));
            const popularPosts = postsWithComments.filter(p => p.comment_count === maxComments);
            return res.json({ popular_posts: popularPosts });
        }
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`live at http://localhost:${PORT}`);
});
