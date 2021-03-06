/* eslint-disable */
import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com'

import { contactData } from '../data';
import { ShieldCheckIcon, ChatAlt2Icon } from '@heroicons/react/outline';
import './styles/Contact.css';

export default function Contact (props) {
    const data = contactData[props.language];
    const [messageSent, setMessageSent] = useState(false);
    const [messageFail, setMessageFail] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailValid, setEmailValid] = useState(null); 
    const regex = {emailRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/};
    const validateEmail = (e) => {
        if(regex.emailRegex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        };
    };
    useEffect(() => {
        if (email === '') {
            setTimeout(() => {
                setEmailValid(null);
            }, 3000);
        }
    }, [email])
    const handleClickEmail = (e) => {
        e.preventDefault();
        validateEmail();
        if (name && emailValid && message) {
            setMessageSent(true);
            emailjs.sendForm('service_mfzvvr1', 'template_nyrqewl', '#EmailJS', 'user_W2UueZCBcwEXPfVQrHSV0')
             .then(result => {
                 setMessageFail(false);
                 console.log(result);
                 setName('');
                 setEmail('');
                 setMessage('');
                })
             .catch(error => {
                 console.log(error);
                 setMessageFail(true);  
             });
        } else {
            setMessageFail(true);
        }
    };
    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setMessage(e.target.value);
        }
    }
    return (
        <section id="contact">
            <div className="ContactText__container">
                <div className="ContactTitle__container">
                    <ChatAlt2Icon className="Icon__contact"/>
                    <h1 className="ContactText__title">&nbsp;{data.title}</h1>
                </div>
                    <p className="ContactText__subtitle">{data.subtitle}</p>
                <div className="Warning__container">
                    <ShieldCheckIcon className="Icon__warning" />
                    <p className="ContactText__warning">
                        &nbsp;{data.warning}
                    </p>
                </div>
            </div>
            <div className="ContactForm__container">
                <form id="EmailJS" className="ContactForm" autoComplete="off">
                    <input
                    className="InputForm"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={handleChange}
                    placeholder={data.name}>
                    </input>
                    <input
                    onBlur={validateEmail}
                    onKeyUp={validateEmail}
                    className="InputForm"
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleChange}
                    placeholder={data.email}>
                    </input>
                    <textarea
                    className="InputForm MessageBox"
                    name="message"
                    type="text"
                    autoComplete="off"
                    maxLength="1000"
                    value={message}
                    onChange={handleChange}
                    placeholder={data.message}>
                    </textarea>
                    <button
                     className="SubmitButton"
                     type="button"
                     onClick={handleClickEmail}>
                    {data.submit}
                    </button>
                    <div className="MessageForm__container">
                        <p>
                            {(messageSent === false && messageFail === null) ? null : (messageFail) ? data.messageError : data.messageOk}
                        </p>
                        <p>
                            {(messageSent === false && emailValid === false) ? data.messageEmailInvalid : null}
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};