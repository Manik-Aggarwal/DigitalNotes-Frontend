import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let history = useNavigate();

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://digital-notes-backend.herokuapp.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email.toLowerCase(), password:credentials.password})
          });

          const json = await response.json();
          console.log(json);
          if(json.success) {
              //save auth token
            localStorage.setItem('token',json.authToken);
            console.log("This is login token", json.authToken);
            props.showAlert("Logged in successfully", "success");
            history('/');
          }
          else{
            props.showAlert("Invalid Credentials", "danger");
          }
    }

  return (
    <div className='container login-container'>
        <form onSubmit={handleSubmit}>
            <div className='mt-3'>
              <h2 className='mt-5'>Login to Continue</h2>
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" placeholder='Enter the email' name='email' className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3 mt-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" placeholder='Enter the password' className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' required/>
            </div>
            <div className="text-center d-grid mx-5">
            <button type="submit" className="btn btn-info mt-5">Login</button>
            </div>
        </form>
        <div className='text-center d-grid mx-5'>
            <h5 className='mt-5'>Don't have an account?</h5> <button type="submit" className="btn btn-info mb-4">SignUp</button>
        </div>
    </div>
  )
}

export default Login