import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const Facebook = ({ informParent = f => f }) => {
    const responseFacebook = response => {
        console.log('Entra aca',response);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { userID: response.userID, accessToken: response.accessToken }
        })
            .then(response => {
                console.log('FACEBOOK SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
            });
    };
    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                cssClass="btn btn-primary btn-lg btn-block"
                icon="fa-facebook mr-2"
            />
        </div>
    );
};

export default Facebook;