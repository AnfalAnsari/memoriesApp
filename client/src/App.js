import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { Container } from "@material-ui/core";
import PostDetailPage from "./components/PostDetailPage/PostDetailPage";

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path='/posts/:id' exact component={PostDetailPage} />
                </Switch>
            </Container>

        </BrowserRouter>
    )
}

export default App;