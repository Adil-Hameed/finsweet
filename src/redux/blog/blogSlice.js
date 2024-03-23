import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllBlogs = createAsyncThunk(
    'blog/fetchAllBlogs',
    async () => {
        try {
            const response = await axios.get('https://61791a83aa7f3400174047a6.mockapi.io/v1/GetBLogs/');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch blogs');
        }
    }
);

export const fetchBlogById = createAsyncThunk(
    'blog/fetchBlogById',
    async (blogId) => {
        try {
            const response = await axios.get(`https://61791a83aa7f3400174047a6.mockapi.io/v1/GetBLogs/${blogId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch blog by ID');
        }
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogPosts: [],
        currentBlog: null,
        allBlogsStatus: 'idle',
        blogByIdStatus: 'idle',
        error: null,
    },
    reducers: {
        incrementViews(state, action) {
            const { postId } = action.payload;
            const postIndex = state.blogPosts.findIndex(post => post.id === postId);

            if (postIndex !== -1) {
                const updatedPost = { ...state.blogPosts[postIndex], views: (state.blogPosts[postIndex].views || 0) + 1 };
                const updatedPosts = [...state.blogPosts];
                updatedPosts[postIndex] = updatedPost;

                return {
                    ...state,
                    blogPosts: updatedPosts
                };
            }

            return state;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllBlogs.pending, (state) => {
                state.allBlogsStatus = 'loading';
            })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.allBlogsStatus = 'succeeded';
                state.blogPosts = action.payload;
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                state.allBlogsStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchBlogById.pending, (state) => {
                state.blogByIdStatus = 'loading';
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.blogByIdStatus = 'succeeded';
                state.currentBlog = action.payload;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.blogByIdStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { incrementViews } = blogSlice.actions;
export default blogSlice.reducer;
