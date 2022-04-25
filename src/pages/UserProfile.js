import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LanguageContext } from "../context/LanguageContext";
import { AuthenticationContext } from '../context/AuthenticationContext';
import PageTitle from "../components/PageTitle";
import ButtonForResetOrSubmit from "../components/ButtonForResetOrSubmit";
import validEmailAddress from "../helpers/validEmailAddress";
import getText from "../helpers/getText";
import getHiddenText from "../helpers/getHiddenText";

function ProfilePage() {
    // Form related state
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [fakeHiddenPassword, setFakeHiddenPassword] = useState('');
    const [updateEmail, setUpdateEmail] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [formFeedbackEmailNl, setFormFeedbackEmailNl] = useState('');
    const [formFeedbackEmailEn, setFormFeedbackEmailEn] = useState('');
    const [formFeedbackPasswordNl, setFormFeedbackPasswordNl] = useState('');
    const [formFeedbackPasswordEn, setFormFeedbackPasswordEn] = useState('');

    // Update related state
    const [errorUpdateRefused, setErrorUpdateRefused] = useState(false);
    const [errorFailedToUpdateUserData, setErrorFailedToUpdateUserData] = useState(false);
    const [updatingUserData, setUpdatingUserData] = useState(false);

    // Language context: language can be "en" (english) or "nl" (dutch).
    const { activeLanguage } = useContext(LanguageContext);

    // Authentication context: keep track of user's authentication status.
    const { user, update } = useContext(AuthenticationContext);

    // Use an abort controller to avoid a memory leak due to unfinished requests.
    let abortController = new AbortController();
    let controlSignal = abortController.signal;

    // Not clear if any mounting effect is needed.
    useEffect(() => {
        // Set the fake hiden password.
        setFakeHiddenPassword(getHiddenText(parseInt(localStorage.getItem('passWordLength'))));
    }, [])

    // Handle submit of form data:
    // - validate form data
    // - provide user feedback for invalid form data
    // - post user data to login endpoint in case of valid form data
    async function handleSubmit(e) {
        e.preventDefault();
        let feedbackEmailNl = ``;
        let feedbackEmailEn = ``;
        let feedbackPasswordNl = ``;
        let feedbackPasswordEn = ``;
        let validFormData = true;
        if (updateEmail) {
            if (!emailValue) {
                feedbackEmailNl = `Vul een e-mailadres in.`;
                feedbackEmailEn = `Email address missing.`;
                validFormData = false;
            } else if (!validEmailAddress(emailValue)) {
                feedbackEmailNl = `"${emailValue}"  is geen geldig e-mailadres.`;
                feedbackEmailEn = `"${emailValue}"  is not a valid e-mail address.`;
                validFormData = false;
            }
        }
        if (updatePassword) {
            if (!passwordValue) {
                feedbackPasswordNl = `Vul een wachtwoord in.`;
                feedbackPasswordEn = `Password missing.`;
                validFormData = false;
            } else if (passwordValue.length < 6) {
                feedbackPasswordNl = `Het wachtwoord moet minstens 6 karakters bevatten.`;
                feedbackPasswordEn = `Your password must consist of at least 6 characters.`;
                validFormData = false;
            }
        }
        setFormFeedbackEmailNl(feedbackEmailNl);
        setFormFeedbackEmailEn(feedbackEmailEn);
        setFormFeedbackPasswordNl(feedbackPasswordNl);
        setFormFeedbackPasswordEn(feedbackPasswordEn);
        // If form data validation found no mistakes:
        // send data updates to the user database.
        setErrorFailedToUpdateUserData(false);
        setErrorUpdateRefused(false);
        if (validFormData) {
            setUpdatingUserData(true);
            // Get JSON Web Token from Local Storage.
            const token = localStorage.getItem('token');
            // Cancel any unfinished previous requests.
            abortController.abort();
            // Control the next request with a new AbortController object.
            abortController = new AbortController();
            controlSignal = abortController.signal;
            try {
                // Put user data.
                // URL to be used for the NOVI Educational Backend API:
                const apiUrl = 'https://frontend-educational-backend.herokuapp.com/api/user';
                // Data updates to be sent:
                let updates = {};
                if (updateEmail && emailValue !== user.email) {
                    updates.email = emailValue;
                }
                if (updatePassword) {
                    updates.password = passwordValue;
                    updates.repeatedPassword = passwordValue;
                }
                if (Object.keys(updates).length > 0) {
                    const result = await axios.put(apiUrl, updates, {
                        // Pass headers
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        // Pass control signal
                        signal: controlSignal,
                    });
                    console.log(result.data);
                    // Provide the update response to the update function and pass the password length.
                    update(result.data, passwordValue.length);
                    // Update the fake hidden password.
                    if (updatePassword) {
                        setFakeHiddenPassword(getHiddenText(passwordValue.length));
                    }
                }
            } catch(error) {
                console.error(error);
                console.log(error.response);
                if (error.toString()==="Error: Network Error") {
                    setErrorFailedToUpdateUserData(true);
                }
                // note, the Novi Educational Backend allows updating user data with an e-mail address and/or password
                // that is already ued for a different account. So, this error is never thrown.
                if (error.toString()==="Error: Request failed with status code 400") {
                    setErrorUpdateRefused(true);
                }
            }
            setUpdatingUserData(false);
        }
        // After successful put request, show the updated values.
        setUpdateEmail(false);
        setUpdatePassword(false);
    }

    // Unmount effect: cancel any unfinished request.
    useEffect(() => {
        // Before unmounting, cancel any unfinished request that is controlled with
        // the abort controller's control signal.
        return function cleanup() {
            abortController.abort();
        }
    }, []);

    // User clicked button to update email address
    function handleUpdateEmail(e) {
        e.preventDefault();
        setUpdateEmail(true);
        setEmailValue(user.email);
    }

    // User clicked button to update password
    function handleUpdatePassword(e) {
        e.preventDefault();
        setUpdatePassword(true);
        setPasswordValue('');
    }

    // User clicked button to undo any email-address update
    function undoUpdateEmail(e) {
        e.preventDefault();
        setUpdateEmail(false);
        setEmailValue(user.email);
        setFormFeedbackEmailNl('');
        setFormFeedbackEmailEn('');
    }

    // User clicked button to undo any password update
    function undoUpdatePassword(e) {
        e.preventDefault();
        setUpdatePassword(false);
        setPasswordValue('');
        setFormFeedbackPasswordNl('');
        setFormFeedbackPasswordEn('');
    }

    // Render page content
    return (
        <>
            <PageTitle page="profile" />
            <form>
                <fieldset>
                    <div className="form-elements-row">
                        <div className="form-elements-box-right-align">
                            <div className="form-elements-row">
                                <div className="form-item">
                                    <span className="form-plain-text">{getText(activeLanguage, "wordUserName")}:</span>
                                </div>
                            </div>
                            <div className="form-elements-row">
                                <div className="form-item">
                                    <span className="form-plain-text">{getText(activeLanguage, "wordEmailAddress")}:</span>
                                </div>
                            </div>
                            <div className="form-elements-row">
                                <div className="form-item">
                                    <span className="form-plain-text">{getText(activeLanguage, "wordPassword")}:</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-elements-box-left-align">
                            <div className="form-elements-row">
                                <div className="form-item">
                                    <span className="form-plain-text">&nbsp;{user.username}</span>
                                </div>
                            </div>
                            <div className="form-elements-row">
                                { updateEmail
                                    ?
                                    <input
                                        type="email"
                                        id="email-field"
                                        name="email"
                                        value={emailValue}
                                        onChange={(e) => setEmailValue(e.target.value)}
                                    />
                                    :
                                    <div className="form-item">
                                        <span className="form-plain-text">&nbsp;{user.email}</span>
                                    </div>
                                }
                            </div>
                            <div className="form-elements-row">
                                { updatePassword
                                    ?
                                    <input
                                        type="password"
                                        id="password-field"
                                        name="password"
                                        autoComplete="new-password"
                                        value={passwordValue}
                                        onChange={(e) => setPasswordValue(e.target.value)}
                                    />
                                    :
                                    <div className="form-item">
                                        <span className="form-plain-text">&nbsp;{fakeHiddenPassword}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="form-elements-box-left-align">
                            <div className="form-elements-row">
                                <div className="form-element">
                                </div>
                            </div>
                            <div className="form-elements-row">
                                <div className="form-element">
                                    { updateEmail
                                        ?
                                        <button className="update" onClick={undoUpdateEmail}>
                                            { getText(activeLanguage, "wordUndo") }
                                        </button>
                                        :
                                        <button className="update" onClick={handleUpdateEmail}>
                                            { getText(activeLanguage, "wordUpdate") }
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className="form-elements-row">
                                <div className="form-element">
                                    { updatePassword
                                        ?
                                        <button className="update" onClick={undoUpdatePassword}>
                                            { getText(activeLanguage, "wordUndo") }
                                        </button>
                                        :
                                        <button className="update" onClick={handleUpdatePassword}>
                                            { getText(activeLanguage, "wordUpdate") }
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-elements-row">
                        <div className="form-element">
                            <ButtonForResetOrSubmit
                                buttonType="submit"
                                buttonDisabled={!updateEmail && !updatePassword}
                                buttonText={ getText(activeLanguage, "wordSend") }
                                fnOnClick={handleSubmit}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
            { formFeedbackEmailNl && activeLanguage === "nl" &&
                <div className="error-message">{formFeedbackEmailNl}</div>
            }
            { formFeedbackEmailEn && activeLanguage === "en" &&
                <div className="error-message">{formFeedbackEmailEn}</div>
            }
            { formFeedbackPasswordNl && activeLanguage === "nl" &&
                <div className="error-message">{formFeedbackPasswordNl}</div>
            }
            { formFeedbackPasswordEn && activeLanguage === "en" &&
                <div className="error-message">{formFeedbackPasswordEn}</div>
            }
            { errorUpdateRefused &&
                <div className="error-message">{ getText(activeLanguage, "msgUpdateRefused") }</div>
            }
            { errorFailedToUpdateUserData &&
                <div className="error-message">{ getText(activeLanguage, "msgFailedToUpdateUserData") }</div>
            }
            { updatingUserData &&
                <div className="status-message">{ getText(activeLanguage, "msgUpdatingUserData") }</div>
            }
        </>
    );
}

export default ProfilePage;