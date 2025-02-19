import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    if (isSuccess && successMessage) {
      const decodedToken = jwtDecode(data?.encoded_token);
      localStorage.setItem("userRole", decodedToken?.role);

      toast.success(successMessage);

      reset();
      states.setToken(data?.encoded_token);
      localStorage.setItem("encoded_token", `${data?.encoded_token}`);

      //navigate("/live-ltp", { replace: true });
      // ✅ Navigate to LiveLtpPage after successful login
      navigate("/layout", { replace: true });
    } else if (isError) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage, data, isSuccess, loading, isError]);

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
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
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
                    //className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 text-black dark:text-white focus:ring focus:ring-blue-400"
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
//   const [acceptTerms, setAcceptTerms] = useState(false);

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

//   // useEffect(() => {
//   //   if (isSuccess && successMessage) {
//   //     const decodedToken = jwtDecode(data?.encoded_token);
//   //     localStorage.setItem("userRole", decodedToken?.role);

//   //     if (decodedToken?.role === "admin") {
//   //       navigate("/admin", { replace: true });
//   //     } else if (decodedToken?.role === "user") {
//   //       navigate("/user", { replace: true });
//   //     } else {
//   //       navigate("/", { replace: true });
//   //     }

//   //     toast.success(successMessage);
//   //     reset();
//   //     setAcceptTerms(false);
//   //     states.setToken(data?.encoded_token);
//   //     localStorage.setItem("encoded_token", `${data?.encoded_token}`);
//   //     localStorage.setItem("public_token", `${data?.public_token}`);
//   //   } else if (isError) {
//   //     toast.error(errorMessage);
//   //   }
//   // }, [successMessage, errorMessage, data, isSuccess, loading, isError]);

//   useEffect(() => {
//     if (isSuccess && successMessage) {
//       const decodedToken = jwtDecode(data?.encoded_token);
//       localStorage.setItem("userRole", decodedToken?.role);

//       toast.success(successMessage);

//       reset();
//       states.setToken(data?.encoded_token);
//       localStorage.setItem("encoded_token", `${data?.encoded_token}`);

//       // 👇 Redirect user to LiveLtp.jsx after login
//       navigate("/live-ltp", { replace: true });
//     } else if (isError) {
//       toast.error(errorMessage);
//     }
//   }, [successMessage, errorMessage, data, isSuccess, loading, isError]);

//   const onSubmit = (formData) => {
//     const payload = {
//       email: formData.email,
//       password: formData.password,
//       terms: acceptTerms,
//     };
//     sendRequest("POST", "/api/auth/signin", payload);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//         {/* Heading */}
//         <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
//           Sign In to Your Account
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-gray-700 dark:text-gray-300">
//               Email
//             </label>
//             <Controller
//               name="email"
//               control={control}
//               rules={{ required: "Email is required" }}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                 />
//               )}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700 dark:text-gray-300">
//               Password
//             </label>
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
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 )}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Terms & Conditions */}
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="terms"
//               checked={acceptTerms}
//               onChange={() => setAcceptTerms(!acceptTerms)}
//               className="mr-2"
//             />
//             <label
//               htmlFor="terms"
//               className="text-gray-700 dark:text-gray-300 text-sm"
//             >
//               I accept the{" "}
//               <a href="#" className="text-blue-500">
//                 terms & conditions
//               </a>
//             </label>
//           </div>

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         {/* Links */}
//         <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
//           <p>
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-500">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
