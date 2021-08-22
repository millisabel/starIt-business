import React, {useState} from 'react';
import auth from './Auth.module.css';
import passwordHash from "password-hash";
import moment from "moment";

const Auth = ({isAuth, setAuth}) => {
    // const requestURL='https://jsonplaceholder.typicode.com/users';
    const requestURL = 'https://starit-api.herokuapp.com/api/business_admin';

    const maxString = 50;
    const minString = 2;
    const [newUser, setNewUser] = useState(true);
    const [loading, setLoading] = useState(false);

    const [login, setLogin] = useState('');
    const [loginMess, setLoginMess] = useState('');
    const [loginValid, setLoginValid] = useState(false);

    const [email, setEmail] = useState('');
    const [emailMess, setEmailMess] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [pass, setPass] = useState('');
    const [passMess, setPassMess] = useState('');
    const [passValid, setPassValid] = useState(false);

    const checkItemValid = (item, reg) => {
        return !!(item && !!item.match(reg) && item.length > minString);
    };

    const checkEmailValid = (item) => {
        if (!item.validity.typeMismatch) {
            return true;
        } else {
            return false;
        }
    };

    const setItemMess = (item, valid, setMess) => {
        if (item && item.length >= maxString) {
            setMess(`max length ${item.length} / ${maxString}`);
        } else if (item && item.length <= minString) {
            setMess(`min length ${minString}`);
        } else if (item && !valid) {
            setMess('invalid character');
        } else if (item) {
            setMess(`${item.length} / ${maxString}`);
        } else if (!item.length) {
            setMess('');
        }
    };

    const setItemValue = (item, setItem) => {
        if (item.length < maxString) {
            setItem(item);
        }
    };

    const checkLogin = (e) => {
        const userLogin = e.target.value;
        const valid = checkItemValid(userLogin, /^[A-Za-z\s]+$/);
        setLoginValid(valid);
        setItemMess(userLogin, valid, setLoginMess);
        setItemValue(userLogin, setLogin);
    };

    const checkEmail = (e) => {
        let userEmail = null;
        let valid = null;
        if (e.nodeName !== 'INPUT') {
            userEmail = e.target.value;
            valid = checkEmailValid(e.target);
        } else {
            valid = !e.validity.typeMismatch;
            userEmail = e.value;
        }
        setEmailValid(valid);
        if (userEmail && userEmail.length >= maxString) {
            setEmailMess(`max length ${userEmail.length} / ${maxString}`);
        } else if (userEmail) {
            setEmailMess(`${userEmail.length} / ${maxString}`);
        } else if (!userEmail.length) {
            setEmailMess('');
        }
        setItemValue(userEmail, setEmail);
    };

    const checkPass = (e) => {
        let userPass = e.target.value;
        const valid = checkItemValid(userPass, /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]+$/);
        setPassValid(valid);
        setItemMess(userPass, valid, setPassMess);
        setItemValue(userPass, setPass);
    };

    const handleClick = () => {
        setNewUser(!newUser);
        const input = document.querySelector('input[type="email"');
        checkEmail(input);
        if (!newUser) {
            send();
        }
    };

    const isDisabled = () => {
        if (newUser) {
            return !(
                login.length &&
                loginValid &&
                email.length &&
                emailValid &&
                pass.length &&
                passValid);
        }
        return !(
            email.length &&
            emailValid &&
            pass.length &&
            passValid);
    };

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (newUser) {
            let data = new FormData(document.querySelector('form'));
            data.set('pass_hash', passwordHash.generate(pass));
            data.set('last_visited', moment().format('YYYY-MM-DD H:mm:ss'));
            sendRequest(requestURL, data)
                .then(response => {
                    setLoading(false);
                    setAuth(true);
                    setSession();
                })
                .catch(err => {
                    setAuth(false);
                    console.log(err)
                })
        } else {
            sendRequest(requestURL)
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    let userEmail = false;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].email === email) {
                            userEmail = true;
                            setAuth(false);
                            if (passwordHash.verify(pass, data[i]['pass_hash'])) {
                                setAuth(true);
                                setSession();
                            } else {
                                setPassMess('You entered an incorrect password');
                                setAuth(false);
                            }
                            return;
                        }
                    }
                    if (!userEmail) {
                        setEmailMess('No user with this email was found');
                    }
                })
                .catch(err => console.log(err))
        }
        e.target.blur();
    }

    const mouseout = (e) => {
        if (email && emailValid && newUser) {
            send();
        }
    };

    function handleFocus(e) {
        if (!e.target.validity.typeMismatch) {
            if (newUser) {
                setEmailValid(true);
                send();
            }
        } else {
            setEmailValid(false);
            setEmailMess('Entered value needs to be an e-mail address.');
        }
    }

    function send() {
        sendRequest(requestURL)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (email && data[i].email === email) {
                        setEmailMess('User with this email already exists');
                        setEmailValid(false);
                        return;
                    }
                }
            })
            .catch(err => console.log(err))
    }

    function setMethod(data) {
        if (newUser && data) {
            return {
                method: 'POST',
                body: data,
            };
        }
        return {
            method: 'GET',
        };
    }

    function sendRequest(url, data) {
        return fetch(url, setMethod(data))
            .then(response => {
                if (response.ok) {
                    return Promise.resolve(response);
                } else {
                    throw new Error("HTTP error " + response.status);
                }
            })
    }

    function setSession() {
        sessionStorage.setItem('isAuth', 'ok')
    }

    return (
        <div className={auth.box}>
            <div className={auth.wrap}>
                <h1 className={auth.title}>welcome to your starit</h1>
                <form>
                    <p className={auth.text}>
                        {newUser ?
                            'Carefully fill in all the necessary fields of the registration form.' :
                            'Please fill out the login form.'}
                    </p>

                    <ul className={auth.list}>
                        {newUser ? <li className={auth.item}>
                            <input
                                id="userName"
                                type="text"
                                name="name"
                                value={login}
                                onChange={checkLogin}
                            />
                            <label htmlFor="userName">Your login: </label>
                            <p className={(!loginValid ? auth.error : null) + ' ' + auth.mess}>
                                {loginMess}
                            </p>
                        </li> : null}
                        <li className={auth.item}>
                            <input
                                id="userEmail"
                                type="email"
                                name="email"
                                value={email}
                                onChange={checkEmail}
                                onBlur={handleFocus}
                                onMouseOut={mouseout}
                            />
                            <label htmlFor="userEmail">E-mail: </label>
                            <p className={(!emailValid ? auth.error : null) + ' ' + auth.mess}>
                                {emailMess}
                            </p>
                        </li>
                        <li className={auth.item}>
                            <input
                                id="userPassword"
                                type="password"
                                name="pass_hash"
                                value={pass}
                                onChange={checkPass}
                            />
                            <label htmlFor="userPassword">Password: </label>
                            <p className={(!passValid ? auth.error : null) + ' ' + auth.mess}>
                                {passMess}
                            </p>
                        </li>
                    </ul>
                    <input
                        onClick={handleSubmit}
                        type='submit'
                        value='Send'
                        disabled={isDisabled()}
                    >
                    </input>
                </form>
                <button
                    className={auth.btn}
                    onClick={handleClick}
                >
                    {newUser ? 'I have an account' : 'I don\'t have an account'}
                </button>
            </div>
            <div className={(!loading ? auth.hidden :null) + ' ' + auth.loading}>
                <div className={auth.loadingBox}>
                    <div className={auth.loadingItem}/>
                    <div className={auth.loadingItem}/>
                    <div className={auth.loadingItem}/>
                    <div className={auth.loadingItem}/>
                    <div className={auth.loadingItem}/>
                    <div className={auth.loadingItem}/>
                    <div className={auth.loadingItem}/>
                    <div className={auth.loadingItem}/>
                </div>
            </div>
        </div>
    );
};

export default Auth;