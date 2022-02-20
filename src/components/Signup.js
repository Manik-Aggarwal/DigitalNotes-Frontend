import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let history = useNavigate();

    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(credentials.password !== credentials.cpassword) {
          props.showAlert("Password and confirm password didn't match", "danger");
          return;
        }
        const response = await fetch("https://digital-notes-backend.herokuapp.com/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email.toLowerCase(), password:credentials.password})
          });

          const json = await response.json();
          console.log(json);
          if(json.success) {
            localStorage.setItem('token',json.authToken);
            history('/');
            props.showAlert("Account created successfully", "success");
          }
          else{
              props.showAlert("Invalid Credentials", "danger");
          }
    }
  return (
    <div className='container mt-5 login-container'>
        <form onSubmit={handleSubmit}>
            <div className='mt-2'>
              <h2>Register to access your notes</h2>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" placeholder='Enter the name' className="form-control" name='name' id="name" onChange={onchange} required/>
            </div>
            <div className="mt-3 mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" placeholder='Enter the email' className="form-control" name='email' id="email" onChange={onchange} aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" placeholder='Enter the password' name='password' className="form-control" id="password" onChange={onchange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" placeholder='Confirm your password' name='cpassword' className="form-control" id="cpassword" onChange={onchange} minLength={5} required/>
            </div>
            <div className="text-center d-grid mx-5 mb-4">
            <button type="submit" className="btn btn-info mt-4">SignUp</button>
            </div>
        </form>
    </div>
  )
}

export default Signup