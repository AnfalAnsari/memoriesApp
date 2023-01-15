import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react'
import useStyle from './styles';
import { getPosts } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';

const Paginate = ({ page }) => {

    const classes = useStyle();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getPosts(page));
    }, [dispatch, page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            variant="outlined"
            color="primary"
            count={numberOfPages}
            page={Number(page)}
            renderItem={
                (item) => <PaginationItem {...item} component={Link} to={`/posts?page= ${item.page}`} />
            }

        />
    )
}

export default Paginate;
