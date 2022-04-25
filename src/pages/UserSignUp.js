import React, {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from "../context/LanguageContext";
import PageTitle from "../components/PageTitle";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import validEmailAddress from "../helpers/validEmailAddress";
import getText from "../helpers/getText";

function SignUpPage() {
    // Form related state
    const [emailValue, setEmailValue] = useState('');
    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [formFeedbackNl, setFormFeedbackNl] = useState('');
    const [formFeedbackEn, setFormFeedbackEn] = useState('');

    // Registration related state
    const [errorFailedToSubscribe, setErrorFailedToSubscribe] = useState(false);
    const [errorRegistrationRefused, setErrorRegistrationRefused] = useState(false);
    const [registrationOngoing, setRegistrationOngoing] = useState(false);

    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // useHistory hook
    const history = useHistory();

    // Handle submit of form data:
    // - validate form data
    // - provide user feedback for invalid form data
    // - post user data to registration endpoint in case of valid form data
    async function handleSubmit(e) {
        e.preventDefault();
        let feedbackNl = ``;
        let feedbackEn = ``;
        let validFormData = true;
        if (!emailValue) {
            feedbackNl = `Vul een e-mailadres in.`;
            feedbackEn = `Email address missing.`;
            validFormData = false;
        } else if (!validEmailAddress(emailValue)) {
            feedbackNl = `"${emailValue}"  is geen geldig e-mailadres.`;
            feedbackEn = `"${emailValue}"  is not a valid e-mail address.`;
            validFormData = false;
        }
        if (!userNameValue) {
            if (feedbackNl) { feedbackNl += ` `; feedbackEn += ` `; }
            feedbackNl += `Vul een gebruikersnaam in.`;
            feedbackEn += `User name missing.`;
            validFormData = false;
        } else if (userNameValue.length < 6) {
            if (feedbackNl) { feedbackNl += ` `; feedbackEn += ` `; }
            feedbackNl += `De gebruikersnaam moet minstens 6 karakters bevatten.`;
            feedbackEn += `Your user name must consist of at least 6 characters.`;
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
            feedbackEn += `Your password must consist of at least 6 characters.`;
            validFormData = false;
        }
        setFormFeedbackNl(feedbackNl);
        setFormFeedbackEn(feedbackEn);
        setErrorFailedToSubscribe(false);
        setErrorRegistrationRefused(false);
        if (validFormData) {
            setRegistrationOngoing(true);
            try {
                // Post user data.
                // URL to be used for the NOVI Educational Backend API:
                const apiUrl = 'https://frontend-educational-backend.herokuapp.com/api/auth/signup';
                await axios.post(apiUrl, {
                    // Registration data required for the NOVI Educational Backend API:
                    username: userNameValue,
                    email: emailValue,
                    password: passwordValue,
                    role: ["user"],
                });

                // Let op: omdat we geen axios Canceltoken gebruiken zul je hier een memory-leak melding krijgen.
                // Om te zien hoe je een canceltoken implementeerd kun je de bonus-branch bekijken!

                // Move ahead to the login-page if no error occurred.
                history.push('/signin');
            } catch(error) {
                console.error(error);
                if (error.toString()==="Error: Network Error") {
                    setErrorFailedToSubscribe(true);
                }
                if (error.toString()==="Error: Request failed with status code 400") {
                    setErrorRegistrationRefused(true);
                }
            }
            setRegistrationOngoing(false);
        }
    }

    // Render page content
    return (
    <>
        <PageTitle page="signup" />
        <p className="meal-browser-text">{ getText(activeLanguage, "msgAccountAlreadyCreated") } <Link to="/signin">{ getText(activeLanguage, "wordLogin").toLowerCase() }</Link>.</p>
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
                            <label htmlFor="email-field">
                                { getText(activeLanguage, "wordEmailAddress") }:
                                <input
                                    type="email"
                                    id="email-field"
                                    name="email"
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
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
                            buttonDisabled={registrationOngoing}
                            buttonText={ getText(activeLanguage, "wordSubscribe") }
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
        { errorFailedToSubscribe &&
            <div className="error-message">{ getText(activeLanguage, "msgFailedToSubscribe") }</div>
        }
        { errorRegistrationRefused &&
            <div className="error-message">{ getText(activeLanguage, "msgRegistrationRefused") }</div>
        }
        { registrationOngoing &&
            <div className="status-message">{ getText(activeLanguage, "msgRegistrationOngoing") }</div>
        }
    </>
  );
}

export default SignUpPage;