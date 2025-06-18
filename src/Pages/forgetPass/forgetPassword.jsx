import axios from "axios";
import { useFormik } from "formik"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Forgetpassword() {
    const navigate = useNavigate();
    const baseUrl = `${window.location.protocol}//${window.location.host}/ResetPassword`;
           // eslint-disable-next-line no-unused-vars
       const queryParams = new URLSearchParams(location.search)

       async function Forget(values) {
        const ToastId = toast.loading("Waiting.....")
       try {
        const options = {
            url:"https://brightminds.runasp.net/api/Account/forget-password",
            method:"POST",
            data:{
                email:values.email,
                clientUrl:baseUrl,
            }
        }
          const{data} = await axios.request(options);
          if(data.message == "Created Successfully") {
            toast.success("Reset Email send to you , please check your email ")
            setTimeout(() => {
               navigate("/confirmforgetpass") 
            }, 2000);
          }
       } catch (error) {
        console.log(error)
       }finally {
        toast.dismiss(ToastId)
       }
 }

 const formik = useFormik({
    initialValues:{
        email:"",
       clientUrl:"",
    },
    onSubmit:Forget,
 })

    return<>
    <form className=" mt-8 space-y-3 shadow-lg py-5 px-3  sm:w-1/2 m-auto rounded-md" onSubmit={formik.handleSubmit}>
        <h2 className="text-center text-2xl font-semibold text-primary-500 mb-11">
           Please enter your email :</h2>
        <div className="email">
         <input 
         type="email"
         placeholder="Email Address"
         className="form-control w-full"
         name="email"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         />
          {formik.errors.email && 
          formik.touched.email && 
            <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.email}</p>
          }
        </div>
       
       <div className="flex items-center justify-center">
        <button type="submit" className="btn bg-primary-500 hover:bg-primary-600   w-full text-white uppercase mt-5">Verfiy</button>
       </div>
     </form>
    
    </>
}