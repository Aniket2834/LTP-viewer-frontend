import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MyContext } from "../hooks/DataContext";
import useCustomQuery from "../hooks/useCustomQuery";

const SignUp = () => {
  const navigate = useNavigate();
  const { sendRequest, loading, isSuccess, errorMessage, successMessage } =
    useCustomQuery();
  const states = useContext(MyContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isSuccess && successMessage) {
      toast.success(successMessage);
      navigate("/signin");
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [isSuccess, successMessage, errorMessage, navigate]);

  const onSubmit = (formData) => {
    sendRequest("POST", "/api/auth/signup", formData);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-900 dark:to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-lg"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Join Us!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              {...register("firstname", { required: "First Name is required" })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </motion.div>

          {/* Last Name */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastname", { required: "Last Name is required" })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </motion.div>

          {/* Mobile Number */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-700 dark:text-gray-300">
              Mobile Number
            </label>
            <input
              type="tel"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
              />
              {/* Show/Hide Password Button */}
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
              />
              {/* Show/Hide Confirm Password Button */}
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;

// import React, { useState, useContext, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { MyContext } from "../hooks/DataContext";
// import useCustomQuery from "../hooks/useCustomQuery";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const {
//     sendRequest,
//     loading,
//     isSuccess,
//     errorMessage,
//     successMessage,
//     data,
//   } = useCustomQuery();
//   const states = useContext(MyContext);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword(!showConfirmPassword);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm();

//   useEffect(() => {
//     if (isSuccess && successMessage) {
//       toast.success(successMessage);
//       navigate("/signin");
//     } else if (errorMessage) {
//       toast.error(errorMessage);
//     }
//   }, [isSuccess, successMessage, errorMessage, navigate]);

//   const onSubmit = (formData) => {
//     sendRequest("POST", "/api/auth/signup", formData);
//     reset();
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//       <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
//           Create an Account
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
//           Already have an account?{" "}
//           <Link
//             to="/signin"
//             className="text-blue-600 dark:text-blue-400 hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="text-gray-700 dark:text-gray-300">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 {...register("firstname", {
//                   required: "First Name is required",
//                 })}
//                 className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//               />
//               {errors.firstName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.firstName.message}
//                 </p>
//               )}
//             </div>

//             <div className="w-1/2">
//               <label className="text-gray-700 dark:text-gray-300">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 {...register("lastname", { required: "Last Name is required" })}
//                 className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//               />
//               {errors.lastName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.lastName.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="text-gray-700 dark:text-gray-300">Email</label>
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Invalid email format",
//                 },
//               })}
//               className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-gray-700 dark:text-gray-300">Mobile</label>
//             <input
//               type="tel"
//               {...register("mobile", {
//                 required: "Mobile number is required",
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: "Enter a valid 10-digit mobile number",
//                 },
//               })}
//               className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//             />
//             {errors.mobile && (
//               <p className="text-red-500 text-sm">{errors.mobile.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-gray-700 dark:text-gray-300">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//                 className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-300"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="text-gray-700 dark:text-gray-300">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 {...register("confirmPassword", {
//                   required: "Please confirm your password",
//                   validate: (value) =>
//                     value === watch("password") || "Passwords do not match",
//                 })}
//                 className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-300"
//                 onClick={toggleConfirmPasswordVisibility}
//               >
//                 {showConfirmPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:bg-gray-400"
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
