import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import Google from './Google';
import 'react-toastify/dist/ReactToastify.min.css';
import { authenticate, isAuth} from './helpers';
import Facebook from './Facebook';

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email:'',
        password: '',
        buttonText: 'Submit'
    });

    const {email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values,[name]:event.target.value});
    }

    const informParent = response =>{
        authenticate(response,() => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        });
    }

    const clickSubmit = event =>  {
        
        event.preventDefault();

        setValues({...values,buttonText: 'Submitting..'});
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
        .then(response => {
            console.log('SIGNIN SUCCESS', response);
            authenticate(response,() => {
                setValues({...values, email:'', password:'', buttonText:'Submit'});
                //toast.success(`Hey ${response.data.user.name}, Welcome Back!`);
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
            });
        })
        .catch(error => {
            console.log('SIGNIN ERROR',error.response.data.error);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>
            <div>
                <Facebook informParent={informParent} />
                <Google informParent={informParent} />
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    );

    return (
    <Layout>
        <div className="col-md-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? <Redirect to="/"/> : null}
            <h1 className="p-5 text-center">Sign In</h1>
            {signinForm()}
            <Link to="/auth/password/forgot" className="mt-3 btn btn-sm btn-outline-danger">Forgot password?</Link>
        </div>
    </Layout>
    );
}

export default Signin;