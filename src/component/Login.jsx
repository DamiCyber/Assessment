import React, { useState } from 'react'
import "../assets/style/Login.css"
import * as yup from "yup"
import { useFormik } from 'formik'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import logo from "../assets/image/Group 2.png"
import gogLogo from "../assets/image/gogLogo.png"
import or from "../assets/image/or.png"
import chrome from "../assets/image/chrome.png"
import fire from "../assets/image/firefox.png"
import expo from "../assets/image/expo.png"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
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

  const [isChecked, setIsChecked] = useState(false);

  const validationSchema = yup.object({
    username: yup.string().required("Required").max(10).min(3),
    password: yup.string().matches(/^[a-zA-z0-9]{8}$/, "Enter a password with letter and number ").required("Required").max(8).min(8),
  })

  const navigate = useNavigate()

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!isChecked) {
        Swal.fire({
          icon: "error",
          title: "Terms & Condition",
          text: "You have to agree with the terms and condition",
        });
        return;
      } else {
        Swal.fire({
          title: "Welcome!",
          text: "Login successful!",
          icon: "success"
        });
        console.log(values);
        navigate("/dashboard");
      }
    }
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const googleIn = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        console.log(result.user);
        setPasswordError("")
      })
      .catch((error) => {
        // Handle errors
        console.log(error.code);
        if (error.code === "auth/internal-error") {
          console.log("Internal Error");
        } else {
          setTimeout(() => {
            navigate("/dashboard")
          }, 1000);
        }
      });
  }
  return (
    <div >
      <div className="back">
        <div className="bigslash">

          <div className="to-give">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="google">
              <button onClick={googleIn} ><img src={gogLogo} alt="" /> Sign In with Google</button>
            </div>
            <div className="or">
              <img src={or} alt="" />
            </div>
            <div className="login">
              <form className="formField" onSubmit={handleSubmit}>
                <label htmlFor="username">Full Name</label>
                <span className='span'>{errors.username}</span>
                <input type="text" onChange={handleChange} name="username" value={values.username} id="username" />
                <label htmlFor="password">Password</label>
                <span className='span'>{errors.password}</span>
                <input class="inpu" onChange={handleChange} name="password" value={values.password} type="password" id="password" />
                <div className="agree">
                  <input type="checkbox" class="check" onChange={handleCheckboxChange} />
                  <div className="words">
                    <p>I agree to the processing of my personal data (name and password) for the purpose of conducting the assessment. Read Privacy Policy to know more.</p>
                  </div>
                </div>
                <button type='submit' className='btn'>Sign In</button>
              </form>
            </div>
          </div>
          <div className="ads">
            <div className="coverAll">
              <div className="first-para">
                <h4>Give your best shot while answering the questions</h4>
              </div>
              <div className="small">
                <p>Wish you the best in it.</p>
              </div>
              <div className="browse">
                <p>Browser Compatibility works best with</p>
              </div>
              <div className="images">
                <img src={chrome} alt="" />
                <img src={fire} alt="" />
                <img src={expo} alt="" />
              </div>
              <div className="network">
                <p>Network Speed</p>
              </div>
              <div className="para">
                <p>Check if you have a decent internet speed. This can be done by logging into your email account. A decent internet connection should enable you to lgin within seconds.</p>
              </div>
              <div className="last">
                <p>Keep your password safe, as it would be needed at other times.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login