import React from 'react';
import Layout from './core/Layout';
import './App.css';

function App() {

  return (
    <Layout>
        <div className="col-md-6 offset-md-3 text-center">
            <h2 className="p-5">React Node MongoDB Authentication Boilerplate</h2>
            <h2>MERN STACK</h2>
            <hr/>
            <p className="text-lead">
              MERN stack login register system with account activation, account activation, forgot password, reset password, login with facebook and google as well
              as private and protected routes for authenticated users and users with role of admin
            </p>
            <b>Bonus</b>
            <p>Profile update and deploy to digital ocean</p>
        </div>
    </Layout>
  );
}

export default App;
