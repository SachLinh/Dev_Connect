import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../untils/api';

const init = {
    loading: false,
    dataPosts: [],
    dataPost:null
};
export const getPosts = createAsyncThunk("posts/getPost", async ()=>{
    try {
        const res = await api.get("/api/posts");
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const getPostsById = createAsyncThunk("posts/getPostById", async (payload)=>{
    try {
        const res = await api.get(`/api/posts/${payload}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const getLike = createAsyncThunk("posts/likePost", async (payload)=>{
    try {
        
        const res = await api.put(`/api/posts/like/${payload.idPost}`,payload.formLike);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
});
export const getUnLike = createAsyncThunk("posts/UnlikePost", async (id)=>{
    try {
        
        const res = await api.put(`/api/posts/unlike/${id}`);
        return {res, id};
    } catch (error) {
        console.log(error);
    }
});
export const getComment = createAsyncThunk("posts/Comment", async (payload)=>{
    try {
        
        const res = await api.post(`/api/posts/comment/${payload.id}`,payload.formData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const DeleteComment = createAsyncThunk("posts/DeleteComment", async (payload)=>{
    try {
        const res = await api.delete(`/api/posts/comment/${payload.id}/${payload.IdCM}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const DeletePost = createAsyncThunk("posts/DeletePost", async (payload)=>{
    try {
        const res = await api.delete(`/api/posts/${payload.idPost}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const CreatePost = createAsyncThunk("posts/creatPost", async (payload)=>{
    try {
        const res = await api.post("/api/posts", payload.formData);
        payload.navigate("/posts");
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const postSlice = createSlice({
    name:"posts",
    initialState:init,
    reducers:{

    },
    extraReducers(builder)
    {
        builder
        // get posts
        .addCase(getPosts.pending,(state,action)=>{
           state.loading = true;
        })
        .addCase(getPosts.fulfilled,(state,action)=>{
           state.loading = false;
           state.dataPosts = action.payload;
        })
        .addCase(getPosts.rejected,(state,action)=>{
           state.loading = false;
        })



        // create post
        .addCase(CreatePost.pending,(state,action)=>{
           state.loading = true;
        })
        .addCase(CreatePost.fulfilled,(state,action)=>{
           state.loading = false;
           state.dataPosts.push(action.payload);
        })
        .addCase(CreatePost.rejected,(state,action)=>{
           state.loading = false;
        })


       // get post by id
       .addCase(getPostsById.pending,(state,action)=>{
        state.loading = true;
        })
       .addCase(getPostsById.fulfilled,(state,action)=>{
        state.loading = false;
        state.dataPost = action.payload;
        })
        .addCase(getPostsById.rejected,(state,action)=>{
        state.loading = false;
        })



       // get comment by id
       .addCase(getComment.pending,(state,action)=>{
        state.loading = true;
        })
       .addCase(getComment.fulfilled,(state,action)=>{
        state.loading = false;
        state.dataPost.comments.push(action.payload[0]);
        })
        .addCase(getComment.rejected,(state,action)=>{
        state.loading = false;
        })



       // delete post
       .addCase(DeletePost.pending,(state,action)=>{
        state.loading = true;
        })
       .addCase(DeletePost.fulfilled,(state,action)=>{
        state.loading = false;
        for(let i =0; i<(state.dataPosts).length; i++)
        {
            if(state.dataPosts[i]._id === action.payload)
            {
                state.dataPosts.splice(action.payload,1);
            }
        }
        })
        .addCase(DeletePost.rejected,(state,action)=>{
        state.loading = false;
        })



       // delete comment
       .addCase(DeleteComment.pending,(state,action)=>{
        state.loading = true;
        })
       .addCase(DeleteComment.fulfilled,(state,action)=>{
        state.loading = false;
        for(let i =0; i<(state.dataPost.comments).length; i++)
            {
                if(state.dataPost.comments[i]._id === action.payload)
                {
                    state.dataPost.comments.splice(action.payload,1);
                }
            }
        })
        .addCase(DeleteComment.rejected,(state,action)=>{
        state.loading = false;
        })



        // like
        .addCase(getLike.pending,(state,action)=>{
            state.loading = true;
         })
         .addCase(getLike.fulfilled,(state,action)=>{
            state.loading = false;
            for(let i =0; i<(state.dataPosts).length; i++)
            {
                if(state.dataPosts[i]._id === action.payload.idPost)
                {
                    state.dataPosts[i].likes.push(action.payload.data[0]);
                }
            }
            
        })
         .addCase(getLike.rejected,(state,action)=>{
            state.loading = false;
         })



        // Un like
        .addCase(getUnLike.pending,(state,action)=>{
            state.loading = true;
         })
         .addCase(getUnLike.fulfilled,(state,action)=>{
            state.loading = false;
            for(let i =0; i<(state.dataPosts).length; i++)
            {
                if(state.dataPosts[i]._id === action.payload.id)
                {
                    state.dataPosts[i].likes.splice(action.payload.data,1);
                }
            }
            
        })
         .addCase(getUnLike.rejected,(state,action)=>{
            state.loading = false;
         })
    }
})
export default postSlice.reducer;