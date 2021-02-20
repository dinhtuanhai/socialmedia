import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, Form, Ref } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { TweenMax, Power3 } from 'gsap';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register(props) {

    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    //USE REF
    let usernameLabel = useRef();
    let usernameInput = useRef();
    let emailLabel = useRef();
    let emailInput = useRef();
    let passwordLabel = useRef();
    let passwordInput = useRef();
    let confirmPasswordLabel = useRef();
    let confirmPasswordInput = useRef();
    let buttonRegister = useRef();

    useEffect(() => {
        TweenMax.staggerFrom(
            [
                usernameLabel, 
                usernameInput, 
                emailLabel,
                emailInput,
                passwordLabel, 
                passwordInput,
                confirmPasswordLabel,
                confirmPasswordInput,
                buttonRegister
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

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1 style={{color: 'teal'}}>Register Page</h1>
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
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                /> */}
                <Form.Field>
                    <label ref={el => {emailLabel = el}}>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={values.email} 
                        placeholder="Password..."
                        // error={errors.username ? true : false}
                        onChange={onChange}
                        ref={el => {emailInput = el}}
                    />
                </Form.Field>
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
                {/* <Form.Input 
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                /> */}
                <Form.Field>
                    <label ref={el => {confirmPasswordLabel = el}}>Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={values.confirmPassword} 
                        placeholder="Confirm Password..."
                        // error={errors.username ? true : false}
                        onChange={onChange}
                        ref={el => {confirmPasswordInput = el}}
                    />
                </Form.Field>
                <Ref innerRef={el => {buttonRegister = el}}>
                    <Button type="submit" color="teal">
                        Register
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`;

export default Register
