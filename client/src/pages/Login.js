import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, Form, Ref } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { TweenMax, Power3 } from 'gsap';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props) {

    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    //USE REF
    let usernameLabel = useRef();
    let usernameInput = useRef();
    let passwordLabel = useRef();
    let passwordInput = useRef();
    let buttonSubmit = useRef();

    useEffect(() => {
        // TweenMax.from(usernameLabel, .8, { opacity: 0, x: 40, ease: Power3.easeOut });
        // TweenMax.from(usernameInput, .8, { opacity: 0, x: 40, ease: Power3.easeOut, delay: .1 });
        // TweenMax.from(passwordLabel, .8, { opacity: 0, x: 40, ease: Power3.easeOut, delay: .2 });
        // TweenMax.from(passwordInput, .8, { opacity: 0, x: 40, ease: Power3.easeOut, delay: .3 });
        // TweenMax.from(buttonSubmit, .8, { opacity: 0, x: 40, ease: Power3.easeOut, delay: .4 });
        TweenMax.staggerFrom(
            [
                usernameLabel, 
                usernameInput, 
                passwordLabel, 
                passwordInput, 
                buttonSubmit
            ], 
            .7, 
            { 
                opacity: 0, 
                x: 500,
                height: 50,
                ease: Power3.easeOut 
            }, 
            .1
        );
    }, []);

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1 style={{color: 'teal'}}>Login Page</h1>
                {/* <Form.Input 
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                /> */}
                <Form.Field>
                    <label ref={el => {usernameLabel = el}}>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={values.username} 
                        placeholder="Username..."
                        // error={errors.username ? true : false}
                        errors
                        onChange={onChange}
                        ref={el => {usernameInput = el}}
                    />
                </Form.Field>
                {/* <Form.Input 
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                /> */}
                <Form.Field>
                    <label ref={el => {passwordLabel = el}}>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={values.password} 
                        placeholder="Password..."
                        // error={errors.username ? true : false}
                        onChange={onChange}
                        ref={el => {passwordInput = el}}
                    />
                </Form.Field>
                <Ref innerRef={el => {buttonSubmit = el}}>
                    <Button type="submit" color="teal">
                        Login
                    </Button>
                </Ref>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
                username: $username
                password: $password
        ) {
            id email username createdAt token
        }
    }
`;

export default Login
