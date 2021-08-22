import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    // useHistory,
    // useLocation,
    // NavLink
} from "react-router-dom";
import Tabs from "./components/Tabs/Tabs";
import Auth from "./components/Auth/Auth";

// import {ProvideAuth} from "./hooks/use-auth.js";

function App() {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        if(sessionStorage.getItem("isAuth")){
            setAuth(true);
        }
    }, []);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        {isAuth ? null : <Auth
                            isAuth = {isAuth}
                            setAuth = {setAuth}
                        />}
                        {isAuth ? <Tabs
                            isAuth = {isAuth}
                            setAuth = {setAuth}
                        /> : null}
                    </Route>

                    {/*<PrivateRoute path="/protected">*/}
                    {/*</PrivateRoute>*/}
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

const PrivateRoute = () => {

};