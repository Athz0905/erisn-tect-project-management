import React, { useState} from 'react';
import {Redirect, Route} from 'react-router-dom';


export const ProtectedRoute = ({ component: Component, ...rest }) => {

    const [isAuthenticated, setAuthenticated] = useState(false);

    
        if (localStorage.getItem('auth_token') && isAuthenticated === false) {
          setAuthenticated(true);
        }

        console.log(isAuthenticated);

    return (
        <Route 
        {...rest}
        render={props => {
            if (isAuthenticated === true) {
                return <Component {...props} />;
            } else {
                return <Redirect to={ 
                    {
                      pathname: "/",
                      state: {
                          from: props.location
                      }
                    }
                } />

                }
            }
            
        }
        />
    );
};