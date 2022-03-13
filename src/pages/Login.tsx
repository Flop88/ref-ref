import {useState, useCallback} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import RefLogo  from '../styles/assets/rr-logo.png'
import axios from 'axios';

interface LoginValues {
    username: string,
    password: string
}

 function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    
})
    const loginHandler = useCallback(async () => {
        try {
            await axios.post('/api/auth/login', { ...form }, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    console.log(response.data.success)
                    const success = response.data.success
                    if (success) {
                        const token = response.data.data
                        localStorage.setItem("token", token)

                        navigate('/users')
                    } else {
                        console.log(response.data)
                    }
                    
                })
        } catch (error) {
            console.log("Ошибка: " + error)
        }
    }, [form])
    const navigate = useNavigate()

    const initialValues: LoginValues = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Логин не должен быть пустым."),
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
                    // setSubmitting(true)
                    // const response = await login({
                    //     variables: values
                    // })
                    // localStorage.setItem("token", response.data.login.token)
                    // setSubmitting(false)
                    // navigate('/users')
                    setSubmitting(true)

                    const response = values
                    const username = response.username
                    const password = response.password

                    console.log(username, password)

                    setForm({ ...form, username: username, password: password})
                    if({...form}.username != "" && {...form}.password != "") {
                        console.log("REGISTER")
                        loginHandler()
                        setSubmitting(false)
                    } else {
                        console.log("ERROR")
                    }
                }}
                >
                    <Form>
                        <Field name="username" type="text" placeholder="Имя пользователя" /> 
                        <ErrorMessage name="username" component={'div'} />
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