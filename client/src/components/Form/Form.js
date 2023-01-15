import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useStyle from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/post';

const defalutPostData = {
    title: '', message: '', creator: '', selectedFile: '', tags: '', name: ''
};

const Form = ({ currentId, setCurrentId }) => {

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const classes = useStyle();
    const [postData, setPostData] = useState(defalutPostData);
    const post = useSelector(state => state.posts.posts.find((post) => post._id === currentId))


    useEffect(() => {
        if (post) setPostData(post);
        else setPostData(defalutPostData);
    }, [post])


    const submitHandler = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.name, creator: user?._id ? user?._id : user?.googleId }));
        } else {
            dispatch(createPost({ ...postData, name: user?.name, creator: user?._id ? user?._id : user?.googleId }));
        }

        clear();
    }

    const clear = () => {
        setPostData(defalutPostData);
        setCurrentId(null);
    }


    if (!user)
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6'>Login to like and create your posts</Typography>
            </Paper>
        )




    return (
        <Paper className={classes.paper} elevation={8}>
            <form className={`${classes.root} ${classes.form}`}>
                <Typography variant='h5' color='textPrimary'> Creating a Memory </Typography>
                <TextField id="standard-basic" label="Title" variant="standard" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField id="standard-basic" label="Tags" variant="standard" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}> <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth onClick={submitHandler}>Submit</Button>
                <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear}> Reset </Button>
            </form>
        </Paper>
    )
}

export default Form;