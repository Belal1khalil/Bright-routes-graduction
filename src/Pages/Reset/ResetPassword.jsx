import axios from "axios";
import { useFormik } from "formik"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup"


export default function ResetPassword() {

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  
    let navigate= useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const email = queryParams.get("email")
    const token = queryParams.get("token")
  
    async function Reset(values) {
        const ToastId = toast.loading("Waiting......")
       try {
        const options = {
            url:"https://brightminds.runasp.net/api/Account/reset-password",
            method:"POST",
            data : {
                email,
                token,
                password:values.password,
                confirmPassword:values.confirmPassword,
            }
        }
          let {data} = await axios.request(options);
          if(data.message == "Password reseted succesfully") {
            toast.success(data.message)
            setTimeout(() => {
                navigate("/login")
            }, 2000);
          }
       } catch (error) {
        console.log(error)
       } finally {
        toast.dismiss(ToastId)
       }
    }
  

    const validationSchema = object({
        password:string().required("Password is required").matches(passwordRegex , "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        confirmPassword:string().required("Confirm password is required").oneOf([ref("password")]),
    })
 const formik = useFormik({
    initialValues:{
        password: "",
       confirmPassword:"",
    },
    validationSchema,
    onSubmit:Reset,
 })

  return (
    <div>
       <form className=" mt-8  space-y-3 shadow-lg py-5 px-3  sm:w-1/2 m-auto" onSubmit={formik.handleSubmit}>
        <h2 className="text-center text-3xl font-semibold text-primary-500 mb-11">
        <i className="fa-regular fa-user mr-2"></i>
         Reset your Password</h2>
        <div className="password">
         <input type="password"
         placeholder="Enter your password"
         className="form-control w-full"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name="password"
         />
          {formik.errors.password && formik.touched.password && 
          
         <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.password}</p>
          }
        </div>
        <div className="RePassword ">
         <input type="password"
         placeholder="Confirm Password"
         className="form-control w-full"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name="confirmPassword"
         />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && 
         <p className="text-sm text-red-500 font-semibold mt-2 ml-2">
            * {formik.errors.confirmPassword}</p>
          }
        </div>
        
       <div className="flex items-center justify-center">
        <button 
        type="submit" 
        className="btn bg-primary-500 hover:bg-primary-600   w-full text-white uppercase mt-5"
        > Reset Password
        </button>
       </div>
     </form>
    </div>
  )
}
