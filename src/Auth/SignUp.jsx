import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      reset();
      navigate("/signin");
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [isSuccess, successMessage, errorMessage, navigate, reset]);

  const onSubmit = (formData) => {
    sendRequest("POST", "/api/auth/signup", formData);
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
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
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
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
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

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SignUp;

// import React, { useState, useContext, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { MyContext } from "../hooks/DataContext";
// import useCustomQuery from "../hooks/useCustomQuery";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const { sendRequest, loading, isSuccess, errorMessage, successMessage } =
//     useCustomQuery();
//   const states = useContext(MyContext);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-900 dark:to-black">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-lg"
//       >
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
//           Join Us!
//         </h2>
//         <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
//           Already have an account?{" "}
//           <Link
//             to="/signin"
//             className="text-blue-600 dark:text-blue-400 hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* First Name */}
//           <motion.div whileHover={{ scale: 1.02 }}>
//             <label className="text-gray-700 dark:text-gray-300">
//               First Name
//             </label>
//             <input
//               type="text"
//               {...register("firstname", { required: "First Name is required" })}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm">{errors.firstName.message}</p>
//             )}
//           </motion.div>

//           {/* Last Name */}
//           <motion.div whileHover={{ scale: 1.02 }}>
//             <label className="text-gray-700 dark:text-gray-300">
//               Last Name
//             </label>
//             <input
//               type="text"
//               {...register("lastname", { required: "Last Name is required" })}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm">{errors.lastName.message}</p>
//             )}
//           </motion.div>

//           {/* Mobile Number */}
//           <motion.div whileHover={{ scale: 1.02 }}>
//             <label className="text-gray-700 dark:text-gray-300">
//               Mobile Number
//             </label>
//             <input
//               type="tel"
//               {...register("mobile", {
//                 required: "Mobile number is required",
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: "Enter a valid 10-digit number",
//                 },
//               })}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
//             />
//             {errors.mobile && (
//               <p className="text-red-500 text-sm">{errors.mobile.message}</p>
//             )}
//           </motion.div>

//           {/* Email Field */}
//           <motion.div whileHover={{ scale: 1.02 }}>
//             <label className="text-gray-700 dark:text-gray-300">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </motion.div>

//           {/* Password Field */}
//           <motion.div whileHover={{ scale: 1.02 }}>
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
//                 className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
//               />
//               {/* Show/Hide Password Button */}
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </motion.div>

//           {/* Confirm Password Field */}
//           <motion.div whileHover={{ scale: 1.02 }}>
//             <label className="text-gray-700 dark:text-gray-300">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 {...register("confirmPassword", {
//                   required: "Confirm your password",
//                   validate: (value) =>
//                     value === watch("password") || "Passwords do not match",
//                 })}
//                 className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
//               />
//               {/* Show/Hide Confirm Password Button */}
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </motion.div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.05 }}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUp;
