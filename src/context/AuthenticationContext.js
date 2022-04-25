import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthenticationContext = createContext({});

function AuthenticationContextProvider({ children }) {
    // Authentication related state
    const [authenticationData, setAuthenticationData] = useState({
        isAuth: false,      // user is authenticated and logged in
        user: null,         // user data
        // status of 1) checking the authentication status and
        //           2) if any user is logged in, fetching user data
        //   pending: the above mentioned procedure is not completed yet,
        //      done: the above mentioned procedure is completed, so
        //            the authentication status has been checked, no user is logged in OR
        //            a user is logged in and fetching user data (successfully or not), is completed.
        status: 'pending',
    });

    // useHistory hook
    const history = useHistory();

    // Handle user login
    function login(loginResponse, passWordLength) {
        // Store the received JSON Web Token in Local Storage
        const token = loginResponse.accessToken;
        localStorage.setItem('token', token);
        // Store the received password length in Local Storage
        localStorage.setItem('passWordLength', passWordLength);
        // Decode the token
        const decodedToken = jwt_decode(token);
        console.log("Gedecodeerd token:");
        console.log(decodedToken);
        // Provide ID, token, and redirect link to the fetchUserData function.
        // fetchUserData(decodedToken.sub, token, '/profile');
        // Store authentication data as context data.
        setAuthenticationData({
            ...authenticationData,
            isAuth: true,
            user: {
                username: loginResponse.username,
                email: loginResponse.email,
                id: loginResponse.id,
            },
            status: 'done',
        });
        // Redirect from login page to profile page.
        history.push('/profile');
        console.log('Gebruiker is ingelogd!');
    }

    // Handle update of user data
    function update(updateResponse, passWordLength) {
        // Store the received password length in Local Storage
        if (passWordLength > 0)
            localStorage.setItem('passWordLength', passWordLength);
        // Store authentication data as context data.
        setAuthenticationData({
            ...authenticationData,
            isAuth: true,
            user: {
                username: updateResponse.username,
                email: updateResponse.email,
                id: updateResponse.id,
            },
            status: 'done',
        });
        // Redirect from login page to profile page.
        history.push('/profile');
        console.log('Gebruikersgegvens zijn gewijzigd!');
    }

    // Handle user logout
    function logout() {
        // Clear the Local Storage
        // localStorage.clear();
        // Remove the JSON Web Token and the password length from Local Storage
        localStorage.removeItem('token');
        localStorage.removeItem('passWordLength');
        // Update authentication data.
        setAuthenticationData({
            isAuth: false,
            user: null,
            status: 'done',
        });
        // Redirect from to home page.
        history.push('/');
        console.log('Gebruiker is uitgelogd!');
    }

    // "Persist on refresh"
    // On mounting, check if a JSON Web Token is already stored in Local Storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If a JSON Web Token is stored, fetch user data for this user
            // The  decoded token could be used to check expiration before contacting the backend.
            // const decoded = jwt_decode(token);
            fetchUserData(token);
        } else {
            // If no JSON Web Token is stored in Local Storage yet, the authentication status check is completed
            setAuthenticationData({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    // Fetch the user data for the user that is logged in based on
    // - the received JSON Web Token
    // - the endpoint that is provided for this purpose by the specific API
    async function fetchUserData(token) {
        console.log("Persist on refresh!");
        try {
            // URL to be used for the NOVI Educational Backend API:
            const apiUrl = 'https://frontend-educational-backend.herokuapp.com/api/user';
            const result = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update state according to query results
            console.log("User data:");
            console.log(result);
            setAuthenticationData({
                ...authenticationData,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            });
        } catch (e) {
            console.error(e);
            console.log(e.resonse);
            // If fetching user data failed, conclude this check.
            setAuthenticationData({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const authenticationContextData = {
        isAuth: authenticationData.isAuth,
        user: authenticationData.user,
        login: login,
        update: update,
        logout: logout,
    };

    return (
        <AuthenticationContext.Provider value={authenticationContextData}>
            {authenticationData.status === 'done' ? children : <p>Checking authentication...</p>}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationContextProvider;