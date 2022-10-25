import axios from "axios";

import { Post } from "../../features/post-feed/postsSlice";

// This is a fancy pants way to separate the actual calls. It sucks ass, but felt right after what I did to the login.

const fetchPostsService : () => Promise<{data: Post[]}> = async () => axios.get('https://jsonplaceholder.typicode.com/posts');

export default fetchPostsService;