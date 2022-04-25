import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from "../context/LanguageContext";
import { AuthenticationContext } from '../context/AuthenticationContext';
import PageTitle from "../components/PageTitle";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import getText from "../helpers/getText";

function SignInPage() {
    // Form related state
    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [formFeedbackNl, setFormFeedbackNl] = useState('');
    const [formFeedbackEn, setFormFeedbackEn] = useState('');

    // Login related state
    const [errorFailedToCheckCredentials, setErrorFailedToCheckCredentials] = useState(false);
    const [errorCredentialsNotFound, setErrorCredentialsNotFound] = useState(false);
    const [loginOngoing, setLoginOngoing] = useState(false);

    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Authentication context: keep track of user's authentication status.
    const { login } = useContext(AuthenticationContext);

    // Handle submit of form data:
    // - validate form data
    // - provide user feedback for invalid form data
    // - post user data to login endpoint in case of valid form data
    async function handleSubmit(e) {
        let feedbackNl = ``;
        let feedbackEn = ``;
        let validFormData = true;
        e.preventDefault();
        if (!userNameValue) {
            feedbackNl = `Vul een gebruikersnaam in.`;
            feedbackEn = `User name missing.`;
            validFormData = false;
        } else if (userNameValue.length < 6) {
            feedbackNl = `De gebruikersnaam moet minstens 6 karakters bevatten.`;
            feedbackEn = `Your user name must consist of at least 6 characters.`;
            validFormData = false;
        }
        if (!passwordValue) {
            if (feedbackNl) { feedbackNl += ` `; feedbackEn += ` `; }
            feedbackNl += `Vul een wachtwoord in.`;
            feedbackEn += `Password missing.`;
            validFormData = false;
        } else if (passwordValue.length < 6) {
            if (feedbackNl) { feedbackNl += ` `; feedbackEn += ` `; }
            feedbackNl += `Het wachtwoord moet minstens 6 karakters bevatten.`;
            feedbackEn += `A password must consist of at least 6 characters.`;
            validFormData = false;
        }
        setFormFeedbackNl(feedbackNl);
        setFormFeedbackEn(feedbackEn);
        setErrorFailedToCheckCredentials(false);
        setErrorCredentialsNotFound(false);
        if (validFormData) {
            setLoginOngoing(true);
            try {
                // Post user data.
                // URL to be used for the NOVI Educational Backend API:
                const apiUrl = 'https://frontend-educational-backend.herokuapp.com/api/auth/signin';
                const result = await axios.post(apiUrl, {
                    // Login data required for the NOVI Educational Backend API:
                    username: userNameValue,
                    password: passwordValue,
                });
                console.log(result.data);
                // Provide the login response to the login function and pass the password length.
                login(result.data, passwordValue.length);
            } catch(error) {
                console.error(error);
                if (error.toString()==="Error: Network Error") {
                    setErrorFailedToCheckCredentials(true);
                }
                if (error.toString()==="Error: Request failed with status code 401") {
                    setErrorCredentialsNotFound(true);
                }
            }
            setLoginOngoing(false);
        }
    }

    // Render page content
    return (
        <>
            <PageTitle page="signin" />
            <p className="meal-browser-text">{ getText(activeLanguage, "msgNoAccountYet") } <Link to="/signup">{ getText(activeLanguage, "wordSubscribe").toLowerCase() }</Link>.</p>
            <form>
                <fieldset>
                    <div className="form-elements-box">
                        <div className="form-elements-row">
                            <div className="form-element">
                                <label htmlFor="username-field">
                                    { getText(activeLanguage, "wordUserName") }:
                                    <input
                                        type="text"
                                        id="username-field"
                                        value={userNameValue}
                                        onChange={(e) => setUserNameValue(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="form-elements-row">
                            <div className="form-element">
                                <label htmlFor="password-field">
                                    { getText(activeLanguage, "wordPassword") }:
                                    <input
                                        type="password"
                                        id="password-field"
                                        name="password"
                                        autoComplete="new-password"
                                        value={passwordValue}
                                        onChange={(e) => setPasswordValue(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-elements-row">
                        <div className="form-element">
                            <ButtonForResetOrSubmit
                                buttonType="submit"
                                buttonText={ getText(activeLanguage, "wordLogin") }
                                fnOnClick={handleSubmit}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
            { formFeedbackNl && activeLanguage === "nl" &&
                <div className="error-message">{formFeedbackNl}</div>
            }
            { formFeedbackEn && activeLanguage === "en" &&
                <div className="error-message">{formFeedbackEn}</div>
            }
            { errorCredentialsNotFound &&
                <div className="error-message">{ getText(activeLanguage, "msgCredentialsNotFound") }</div>
            }
            { errorFailedToCheckCredentials &&
                <div className="error-message">{ getText(activeLanguage, "msgFailedToCheckCredentials") }</div>
            }
            { loginOngoing &&
                <div className="status-message">{ getText(activeLanguage, "msgLoginOngoing") }</div>
            }
        </>
    );
}

export default SignInPage;