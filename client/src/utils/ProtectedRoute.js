import React from 'react'
import {Route, Redirect} from 'react-router-dom'



export default function ProtectedRoute({component: Component, ...rest}) {
   return (
       <Route
           {...rest}
           render={props => {
               return (localStorage.getItem('token'))
               ? <Component {...props} />
               : <Redirect to='/Login' />
           }}
       />
   )
}