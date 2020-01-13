import React, {useState} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = () => {
    const [values, setValues] = useState({
        email:'',
        buttonText: 'Recover password'
    });

    const {email, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values,[name]:event.target.value});
    }

    const clickSubmit = event =>  {
        
        event.preventDefault();

        setValues({...values,buttonText: 'Submitting..'});
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: {email}
        })
        .then(response => {
            console.log('FORGOT SUCCESS',response);
            setValues({...values, email:'', buttonText:'Submit'});
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('FORGOT ERROR',error.response.data.error);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const forgotForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    );

    return (
    <Layout>
        <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="p-5 text-center">Forgot Password</h1>
            {forgotForm()}
        </div>
    </Layout>
    );
}

export default Forgot;