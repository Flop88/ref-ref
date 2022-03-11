import React from 'react';
import {gql, useMutation} from '@apollo/client'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import RefLogo  from '../styles/assets/rr-logo.png'

const SIGNUP_MATATION = gql`
mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
        token
    }
}
`

interface SignupValues {
    email: string,
    password: string,
    confirmPassword: string,
    name: string
}

 function Signup() {
    const navigate = useNavigate()
    const [signup, {data}]= useMutation(SIGNUP_MATATION)

    const initialValues: SignupValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email required"),
        password: Yup.string()
            .max(20,"Must be 20 characters or less")
            .required("Password required"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "Password must match"),
        name: Yup.string()
            .max(15,"Name be 15 characters or less")
            .required("Name required"),
    })

    return(
        <div className="container">
			<Link to="/main">
                <img src={RefLogo} alt="logo" style={{ width: "100px" }} className="logo" />
            </Link>
            <h3>Регистрация в Ref Ref</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async(values, {setSubmitting}) => {
                    setSubmitting(true)
                    const response = await signup({
                        variables: values
                    })
                    localStorage.setItem("token", response.data.signup.token)
                    setSubmitting(false)
                    navigate('/users')
                }}
                >
                    <Form>
                        <Field name="email" type="text" placeholder="Email" /> 
                        <ErrorMessage name="email" component={'div'} />
                        <Field name="name" type="text" placeholder="Имя пользователя" /> 
                        <ErrorMessage name="name" component={'div'} />
                        <Field name="password" type="password" placeholder="Пароль" /> 
                        <ErrorMessage name="password" component={'div'} />
                        <Field name="confirmPassword" type="password" placeholder="Подтверждение пароля" /> 
                        <ErrorMessage name="confirmPassword" component={'div'} />
                        <button type="submit" className="login-btn"><span>Регистрация</span></button>
                    </Form>    
                </Formik> 
                <div className="register">
                    <h4>Уже зарегистрированы?</h4>
                    <Link to="/login">Войти</Link>
                </div>
        </div>
    )
} 

export default Signup