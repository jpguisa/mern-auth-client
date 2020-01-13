import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../auth/helpers';

const Layout = ({children, match, history}) => {
  
    const isActive = path => {
      if(match.path === path){
        return {color:'#000'};
      }else{
        return {color:'#fff'};
      }
    };

    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
          <li className="nav-item">
            <Link style={isActive('/')} className="nav-link" to="/">
              Home
            </Link>
          </li>
          {!isAuth() && ( 
            <Fragment>
              <li className="nav-item">
                <Link style={isActive('/signup')} className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link style={isActive('/signin')} className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
          </Fragment>
          )}

          {isAuth() && isAuth().role === 'admin' && ( 
              <li className="nav-item">
                <Link style={isActive('/admin')} className="nav-link" to="/admin">{isAuth().name}</Link>
              </li>
          )}
          {isAuth() && isAuth().role === 'subscriber' && ( 
              <li className="nav-item">
                <Link style={isActive('/private')} className="nav-link" to="/private">{isAuth().name}</Link>
              </li>
          )}
          {isAuth() && ( 
              <li className="nav-item">
                <span className="nav-link" style={{cursor:'pointer', color:'#fff'}} onClick={()=>{
                  signout(()=>{
                    history.push('/')
                  })
                }}>
                Sign out
                </span>
              </li>
          ) }
        </ul>
      );
    return (
        <Fragment>
            {nav()}
            <div className="container">
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);