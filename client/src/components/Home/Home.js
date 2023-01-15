import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Paginate from '../Pagination/Pagination';
import ChipInput from 'material-ui-chip-input'
import { useLocation, useHistory } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/post';
import useStyle from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyle();
    const query = useQuery();
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentId, setCurrentId] = useState();
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');



    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    const handleSearch = () => {
        if (search.trim() || tags.length) {
            dispatch(getPostsBySearch(search, tags));
            history.push(`/posts/search?searchQuery=${searchQuery}&tags=${tags.join(",")}`);

        }
    }

    return (
        <Container maxWidth='xl'>
            <Grow in>
                <Grid className={classes.gridContainer} container justifyContent="space-between" spacing={8}>
                    <Grid item xs={12} sm={6} md={8}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" label="Search" variant='outlined' fullWidth value={search} onChange={e => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAddChip}
                                onDelete={handleDeleteChip}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button variant='contained' color='primary' fullWidth onClick={handleSearch} >Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Paginate page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grow>
        </Container>
    )
}

export default Home
