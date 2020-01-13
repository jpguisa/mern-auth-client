import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt from 'jsonwebtoken';

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name:'',
        token:'',
        show: true,
    });

    const {name, token, show } = values;

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);
        //console.log(token);
        if(token) {
            setValues({...values, name, token});
        }
    },[]);

    const clickSubmit = event =>  {
        
        event.preventDefault();
        
        setValues({...values,buttonText: 'Submitting..'});
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/activate`,
            data: { token }
        })
        .then(response => {
            console.log('ACTIVATE SUCCESS',response);
            setValues({...values, show:false});
            toast.success(response.data.message);
        })
        .catch(error =>{
            console.log('ACTIVATE ERROR',error.response.data);
            toast.error(error.response.data.error);
        })
    }

    const activationLink = () => (
        <div>
            <h1 className="p-5 text-center">Hey {name}, ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>Activate account</button>
        </div>
    )

    return (
    <Layout>
        <div className="col-md-6 offset-md-3">
            <ToastContainer />
            {JSON.stringify({name, token, show})}
            {activationLink()}
        </div>
    </Layout>
    );
}

export default Activate;