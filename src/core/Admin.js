import React, {useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {isAuth, getCookie, signout, updateUser} from '../auth/helpers';

const Admin = ({history}) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const {name,role, email, password, buttonText} = values;
    
    const token = getCookie('token');

    useEffect(() => {
        loadProfile()
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('update success');
            const {role, name, email} = response.data;
            setValues({...values,role,name,email});
        })
        .catch(error => {
            console.log('update err', error);
            if(error.response.status === 401){
                signout(() => {
                    history.push('/');
                });
            }
        });
    }

    const handleChange = (name) => (event) => {
        setValues({...values,[name]:event.target.value});
    }

    const clickSubmit = event =>  {
        
        event.preventDefault();

        setValues({...values,buttonText: 'Submitting..'});
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            data: {name, password},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('SIGNUP SUCCESS',response);

            updateUser(response, () => {
                setValues({...values, buttonText:'Submit'});
                toast.success("Profile updated successfully");
            })

        })
        .catch(error =>{
            console.log('UPDATE USER ERROR',error.response.data);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input readOnly defaultValue={role} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input readOnly defaultValue={email} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
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
            <h1 className="p-5 text-center">Admin</h1>
            {signupForm()}
        </div>
    </Layout>
    );
}

export default Admin;