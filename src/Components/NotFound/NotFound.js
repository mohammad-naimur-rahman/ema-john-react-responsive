import React from 'react';

const NotFound = () => {

    document.title = '404 ERROR';
    return (
        <div className='text-center text-danger'>
            <h2>Sorry, the page you are searching is not found</h2>
            <h3>Error, 404 NOT FOUND</h3>
        </div>
    );
};

export default NotFound;