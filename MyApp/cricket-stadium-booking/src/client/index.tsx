import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signin" component={SignIn} />
                <Route path="/booking" component={Booking} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));