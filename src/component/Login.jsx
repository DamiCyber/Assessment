import React from 'react'
import "../assets/style/Login.css"
import * as yup from "yup"
import { useFormik } from 'formik'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyCsTVkHrRraCfKG07b-vPlebvtyp8dqfcE",
  authDomain: "assessment-accda.firebaseapp.com",
  projectId: "assessment-accda",
  storageBucket: "assessment-accda.appspot.com",
  messagingSenderId: "689595600731",
  appId: "1:689595600731:web:ecbcc875c3c48e0254947e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

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
  const googleIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful sign-in
      console.log(result.user);
      setPasswordError("")
     
      setTimeout(() => {
        // navigate('/dashboard')
      }, 1000);
    })
    .catch((error) => {
      // Handle errors
      console.log(error.code);
      if (error.code === "auth/internal-error") {
          console.log("Internal Error");
      } else {
       
      }
    });
  }
  return (
    <div>
      <div className="bigslash">
       
        <div className="to-give">
        <button onClick={googleIn} >connect with google</button>
          <div className="logo">
            <h1>Laptop4Developers</h1>
          </div>
          <div className="login">
            <form className="formField" onSubmit={handleSubmit}>
              <span>{errors.username}</span>
              <input type="text" onChange={handleChange} name="username" value={values.username} id="username" />
              <span>{errors.pass}</span>
              <input class="inpu" onChange={handleChange} name="password" value={values.password} type="password" id="password" />
              <button type='submit'>Login</button>
            </form>
          </div>
        </div>
        <div className="ads"></div>
      </div>
    </div>
  )
}

export default Login