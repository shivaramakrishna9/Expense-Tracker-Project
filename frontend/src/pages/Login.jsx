import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation
  const validate = (data) => {
    let newErrors = {};

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(data.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase & number";
    }

    return newErrors;
  };

  // Input Change
  const handleChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          navigate('/form');
        } else {
          setErrors({ general: 'Invalid credentials' });
        }
      } catch (error) {
        setErrors({ general: 'Network error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    form.email &&
    form.password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] flex items-center justify-center px-4">

      {/* Glow Background */}
      <div className="absolute w-80 h-80 bg-purple-600/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-blue-600/20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-8"
      >
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">
            <ShieldCheck size={16} />
            Secure Access
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Login to continue managing your finances
        </p>

        {/* Email */}
        <div className="relative mb-4">
          <Mail
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#111827] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {errors.email && (
          <p className="text-red-400 text-sm mb-4">
            {errors.email}
          </p>
        )}

        {/* Password */}
        <div className="relative mb-4">
          <Lock
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#111827] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-400 text-sm mb-6">
            {errors.password}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            isValid
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[1.02] hover:shadow-xl"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;