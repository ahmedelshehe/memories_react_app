import React from "react";
import {BrowserRouter as Router, Route , Routes ,Navigate} from 'react-router-dom';
import {Container} from "@material-ui/core"
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { PostDetails } from "./components/PostDetails/PostDetails";
const App = () =>{
    const user =JSON.parse(localStorage.getItem('profile'))
    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Navigate  to="/posts" />} />
                        <Route path="/posts" exact element={<Home />} />
                        <Route path="/posts/search" exact element={<Home />} />
                        <Route path="/auth" exact element={
                            (user) ? <Navigate  to="/posts" /> : <Auth />
                        } />
                        <Route path="/posts/:id" exact element={<PostDetails />} />
                    </Routes>
            </Container>
        </Router>
    )
}
export default App;