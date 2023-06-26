import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
const FormValidationExample = () => {

  let [error, setError] = useState("");

  const navigate=useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    //let newData=JSON.stringify(data)
    // Add your form submission logic here
    //let fd=new FormData()
    //append newUser to form
    //fd.append('user',JSON.stringify(data))

    //HTTP REQUEST
    axios
        .post("http://localhost:4000/user-api/register-user",data)
        .then((response)=>{
          if(response.status===201){
            //navigate to login page
            navigate('/Login')
          }
          if(response.status!==201){
            setError(response.data.message)
          }
        })
        .catch((err)=>{
          //the client is given an error respnse
          if(err.response){
            setError(err.message)
          }
          else if(err.request){
            setError(err.message)
          }
          else{
            setError(err.message)
          }
          
        })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {error.length!==0 && (
        <p>{error}</p>
      )}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder='dark rai'
          {...register('username', { required: 'Username is required' })}
          className={errors.username ? 'input-error' : ''}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email is invalid',
            },
          })}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required' })}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>


      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default FormValidationExample;
