import React from 'react';
import axios from 'axios';

function Button({ onClick, text }) {
    return (
        <button className="btn btn-danger" onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;
