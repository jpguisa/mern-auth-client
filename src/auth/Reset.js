import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt from 'jsonwebtoken';

const Reset = ({match}) => {

    const [values, setValues] = useState({
        name:'',
        newPassword:'',
        token:'',
        buttonText: 'Change password'
    });

    const {name, newPassword, token, buttonText} = values;

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);
        //console.log(token);
        if(token) {
            setValues({...values, name, token});
        }
    },[]);



    const handleChange = (event) => {
        setValues({...values, newPassword:event.target.value});
    }

    const clickSubmit = event =>  {
        
        event.preventDefault();

        setValues({...values,buttonText: 'Submitting..'});
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword, resetPasswordLink: token}
        })
        .then(response => {
            console.log('Reset SUCCESS',response);
            setValues({...values, newPassword:'', buttonText:'Submit'});
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('Reset ERROR',error.response.data.error);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const resetForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input required onChange={handleChange} value={newPassword} type="password" className="form-control" />
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
            <h3 className="p-5 text-center">Hey {name}, type your new password</h3>
            {resetForm()}
        </div>
    </Layout>
    );
}

export default Reset;