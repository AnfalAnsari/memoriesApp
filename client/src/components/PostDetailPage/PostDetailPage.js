import React from 'react'
import { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import useStyles from './styles';
import moment from 'moment';
import { getPost } from '../../actions/post';
import { getPostsBySearch } from '../../actions/post';

const PostDetailPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { post, isLoading, posts } = useSelector(state => state.posts);
    const classes = useStyles();
    const { id } = useParams();


    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id])


    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch("", post.tags));

        }
    }, [post], dispatch)


    const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)

    const openPost = (id) => {
        history.push(`/posts/${id}`);
    }

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }


    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag, index) => (
                        <Link key={index} to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` #${tag} `}
                        </Link>
                    ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">
                        Created by:
                        <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` ${post.name}`}
                        </Link>
                    </Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
                {recommendedPosts.length && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">You might also like:</Typography>
                        <Divider />
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                    <img src={selectedFile} alt="img" width="200px" />
                                </div>
                            ))}
                        </div>
                    </div>
                )
                }
            </div>
        </Paper>
    )
}

export default PostDetailPage
