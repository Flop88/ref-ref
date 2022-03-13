import { useState } from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import RefLogo  from '../styles/assets/rr-logo.png'
import axios from 'axios';


interface SignupValues {
    username: string,
    password: string,
    confirmPassword: string
}
 function Signup() {
    const navigate = useNavigate()

    const initialValues: SignupValues = {
        username: '',
        password: '',
        confirmPassword: ''
    }
    const [form, setForm] = useState({
            username: '',
            password: ''
        
    })

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username required"),
        password: Yup.string()
            .max(20,"Must be 20 characters or less")
            .required("Password required"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "Password must match"),
    })

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', { ...form }, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    console.log(response)
                })
        } catch (error) {
            console.log("Ошибка: " + error)
        }
    }

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

                    const response = values
                    const username = response.username
                    const password = response.password

                    setForm({ ...form, username: username, password: password})

                    if({...form}.username != "" && {...form}.password != "") {
                        registerHandler()
                        setSubmitting(false)
                        navigate('/users')
                    } else {
                        console.log("ERROR")
                    }
                    
                    // localStorage.setItem("token", response.data.signup.token)
                    setSubmitting(false)
                }}
                >
                    <Form>
                        <Field name="username" type="text" placeholder="Имя пользователя" /> 
                        <ErrorMessage name="username" component={'div'} />
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