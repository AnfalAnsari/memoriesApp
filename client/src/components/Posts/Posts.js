import React from "react";
import Post from "./Post/Post";
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from "@material-ui/core";
const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts)

    return isLoading ? <CircularProgress /> : (
        <Grid container spacing={3}>
            {posts.map(post => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}  ><Post post={post} setCurrentId={setCurrentId} /></Grid>
            ))}

        </Grid>
    );

}

export default Posts;