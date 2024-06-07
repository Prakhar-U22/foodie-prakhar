import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
});


  const handleOnChange = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const json = await response.json();
    console.log(json);


    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    else {alert("You have succesfully created. You can login")}
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='container p-5'>
      <form onSubmit={handleOnChange}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Full Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAddress" className="form-label">Geo-location</label>
          <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} id="exampleInputAddress" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/login" className="btn btn-success m-3">Already a User</Link>
      </form>
    </div>
  );
}
