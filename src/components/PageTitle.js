import React from 'react';
import './PageTitle.css';

function PageTitle({ text }) {
    return (
        <header className="page-title">
            <h1>{text}</h1>
        </header>
    )
}

export default PageTitle;