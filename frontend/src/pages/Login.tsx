// src/pages/login.tsx
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Simple validation
    if (!email || !password) {
      setFormError("Please fill out all required fields.");
      return;
    }

    setFormError(null);
    console.log({ email, password, type: "Login" });
    // proceed with actual login logic...
  };

  const formVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          variants={formVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="backdrop-blur-lg bg-white/70 border border-purple-200 shadow-xl rounded-3xl p-10 w-full max-w-md flex flex-col gap-5 text-zinc-700"
        >
          <h2 className="text-3xl font-bold text-purple-700 text-center tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500">
            Log in to continue booking your doctor.
          </p>

          <AnimatePresence>
            {formError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm"
              >
                {formError}
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
              type="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
          >
            Login
          </button>

          <div className="text-center text-sm mt-3">
            New to us?{" "}
            <span
              className="text-purple-600 font-medium hover:underline cursor-pointer transition-colors duration-300"
              onClick={() => {
                setFormError(null); // clear error when switching
                window.location.href = '/signup'; // Redirect to Sign Up
              }}
            >
              Sign up here
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default Login;