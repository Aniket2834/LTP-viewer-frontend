import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import useCustomQuery from "../hooks/useCustomQuery";
import { MyContext } from "../hooks/DataContext";
import { motion } from "framer-motion";

const SignIn = () => {
  const {
    loading,
    data,
    successMessage,
    errorMessage,
    sendRequest,
    isSuccess,
    isError,
  } = useCustomQuery();

  const states = useContext(MyContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    console.log("Success:", successMessage);
    console.log("Error:", errorMessage);

    if (isSuccess && successMessage) {
      const decodedToken = jwtDecode(data?.encoded_token);
      localStorage.setItem("userRole", decodedToken?.role);

      toast.success(successMessage);

      reset();
      states.setToken(data?.encoded_token);
      localStorage.setItem("encoded_token", `${data?.encoded_token}`);

      navigate("/layout", { replace: true });
    } else if (isError) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage, data, isSuccess, isError]);

  const onSubmit = (formData) => {
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    sendRequest("POST", "/api/auth/signin", payload);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 px-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
      >
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 text-black dark:text-black"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-black focus:ring focus:ring-blue-400"
                  />
                )}
              />
              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </motion.div>
  );
};

export default SignIn;

// import React, { useContext, useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { jwtDecode } from "jwt-decode";
// import useCustomQuery from "../hooks/useCustomQuery";
// import { MyContext } from "../hooks/DataContext";
// import { motion } from "framer-motion";

// const SignIn = () => {
//   const {
//     loading,
//     data,
//     successMessage,
//     errorMessage,
//     sendRequest,
//     isSuccess,
//     isError,
//   } = useCustomQuery();

//   const states = useContext(MyContext);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     mode: "onChange",
//   });

//   useEffect(() => {
//     if (isSuccess && successMessage) {
//       const decodedToken = jwtDecode(data?.encoded_token);
//       localStorage.setItem("userRole", decodedToken?.role);

//       console.log("success message", successMessage);
//       toast.success(successMessage);

//       reset();
//       states.setToken(data?.encoded_token);
//       localStorage.setItem("encoded_token", `${data?.encoded_token}`);

//       navigate("/layout", { replace: true });
//     } else if (isError) {
//       toast.error(errorMessage);
//     }
//   }, [successMessage, errorMessage, data, isSuccess, loading, isError]);

//   const onSubmit = (formData) => {
//     const payload = {
//       email: formData.email,
//       password: formData.password,
//     };
//     sendRequest("POST", "/api/auth/signin", payload);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 px-4"
//     >
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-white rounded-lg shadow-xl p-6"
//       >
//         <h2 className="text-center text-3xl font-bold text-gray-800">
//           Welcome Back
//         </h2>
//         <p className="text-center text-gray-600 mb-6">Sign in to continue</p>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <Controller
//               name="email"
//               control={control}
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^\S+@\S+\.\S+$/,
//                   message: "Enter a valid email",
//                 },
//               }}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
//                   style={{ color: "black" }} // ✅ Force text to always be black
//                 />
//               )}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <div className="relative">
//               <Controller
//                 name="password"
//                 control={control}
//                 rules={{ required: "Password is required" }}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     className="w-full p-3 border rounded-lg bg-white focus:ring focus:ring-blue-400"
//                     style={{ color: "black" }} // ✅ Force text to always be black
//                   />
//                 )}
//               />
//               {/* Show/Hide Password Button */}
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-500"
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white py-2 rounded-lg font-semibold"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </motion.button>
//         </form>

//         {/* Sign Up Link */}
//         <div className="text-center mt-4 text-gray-700">
//           <p>
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-indigo-500 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default SignIn;
