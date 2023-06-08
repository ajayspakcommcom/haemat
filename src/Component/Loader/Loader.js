import React from 'react';
import './Loader.css';

const Loader = (props) => {
    return (
        <>
            <div class="overlay">
                <div class="overlay__inner">
                    <div class="overlay__content"><span class="spinner"></span></div>
                </div>
            </div>
        </>
    );
};

export default Loader;