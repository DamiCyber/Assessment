import React from 'react'
import "../assets/style/Login.css"
import * as yup from "yup"
import { useFormik } from 'formik'
const Login = () => {
  const validationSchema = yup.object({
    username: yup.string().required("Required").max(10).min(3),
    password: yup.string().matches(/^[a-zA-z0-9]{8}$/, "Enter a password with letter and number ").required("Required").max(8).min(8),
  })
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  })
  return (
    <div>
      <div className="bigslash">
        <div className="to-give">
          <div className="logo">
            <h1>Laptop4Developers</h1>
          </div>
          <div className="login">
            <div className="formField" onSubmit={handleSubmit}>
              <input type="text" onChange={handleChange} name="username" value={values.username} id="username"/>
              <input type="password" onChange={handleChange} name="password" value={values.password} id="password"/>
              <button type='submit'>Login</button>
            </div>
          </div>
        </div>
        <div className="ads"></div>
      </div>
    </div>
  )
}

export default Login