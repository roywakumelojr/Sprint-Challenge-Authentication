import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import {Form, Button, Grid, Header} from "semantic-ui-react";

export default function Login(props) {
    const [auth, setAuth] = useState({username:'', password:''});
  
    const handleChanges = e => {
      setAuth({
        ...auth,
        [e.target.name] : e.target.value
      })
    };
      
    const onSubmit = e => {
      e.preventDefault()
      axiosWithAuth()
      .post('/api/auth/login', auth)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.user.id);
        props.history.push('/dashboard');
      })
      .catch(err => console.log("There was an error processing your request, please try again", err.response));
    };
      
      return (
    
      <header className="App-header">
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}  className="login">
            <Header as='h2' color='orange' textAlign='center'>Login</Header>
            <Form onSubmit={onSubmit}>
              <Form.Input
                name="username" 
                type="username"
                placeholder="username"
                value={auth.username}
                onChange={handleChanges} 
              />
              
              <Form.Input
                name="password" 
                type="password"
                placeholder="Password"
                value={auth.password}
                onChange={handleChanges} 
              />
              <Button color='orange' fluid size='large' type="submit">Login</Button>
            </Form>
      
            <p>
              <strong>Not A Member?</strong> <Link className="login-redirect" to="/register">Register</Link>
            </p>
          </Grid.Column>
        </Grid>
      </header>
    )
}