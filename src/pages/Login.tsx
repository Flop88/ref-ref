import React from 'react';
import {gql, useMutation} from '@apollo/client'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import RefLogo  from '../styles/assets/rr-logo.png'

const LOGIN_MATATION = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
}
`

interface LoginValues {
    email: string,
    password: string
}

 function Login() {
    const navigate = useNavigate()
    const [login, {data}]= useMutation(LOGIN_MATATION)

    const initialValues: LoginValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Не корректный email.")
            .required("Email не должен быть пустым."),
        password: Yup.string()
            .max(20,"Должно быть не более 20 символов.")
            .required("Пароль не должен быть пустым.")
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
                    const response = await login({
                        variables: values
                    })
                    localStorage.setItem("token", response.data.login.token)
                    setSubmitting(false)
                    navigate('/users')
                }}
                >
                    <Form>
                        <Field name="email" type="text" placeholder="Email" /> 
                        <ErrorMessage name="email" component={'div'} />
                        <Field name="password" type="password" placeholder="Пароль" /> 
                        <ErrorMessage name="password" component={'div'} />
                        <button type="submit" className="login-btn"><span>Войти</span></button>
                    </Form>    
                </Formik> 
                <div className="register">
                    <h4>Нет аккаунта?</h4>
                    <Link to="/signup">Зарегистрироваться</Link>
                </div>
        </div>
    )
} 

export default Login