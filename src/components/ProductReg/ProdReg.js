import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './ProdReg.css';
import axios from 'axios';
const ProdReg = () => {

  let [error, setError] = useState("");
  let [file,setFile]=useState(null)

  const navigate=useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    //console.log('Form submitted:', data);
    // Add your form submission logic here
    let fd=new FormData()
    //append newUser to form
    fd.append('user',JSON.stringify(data))
    //append selected file to form
    fd.append('photo',file)

    //HTTP REQUEST
    axios
        .post("http://localhost:4000/products-api/create-products",fd)
        .then((response)=>{
          if(response.status===201){
            //navigate to login page
            navigate('/User-profile')
            console.log('success')
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
        //ProductStore(fd)
  };
  //on file select
  const OnFileSelect=(e)=>{
    setFile(e.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="address">address</label>
        <textarea
          type="text"
          id="address"
          placeholder='ENTER PROPERTY ADDRESS'
          {...register('address', { required: 'Address required' })}
          className={errors.address ? 'input-error' : ''}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="area">Area of property</label>
        <input
          type="text"
          id="text"
          placeholder='ex:1200sqft'
          {...register('area', {
            required: 'Mention Area',
          })}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="price"
          id="price"
          {...register('price', { required: 'Mention price' })}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="name">select property pic</label>
        <input
          type="file"
          id="image"
          {...register('image', { required: 'image is required' })}
          className={errors.password ? 'input-error' : ''}
          onInput={OnFileSelect}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default ProdReg;
