import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    occupation: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Email validation
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.age ||
      !form.gender ||
      !form.occupation ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all fields correctly");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError("Enter valid email address");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be 8+ chars with uppercase, lowercase & number"
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: form.fullName,
          age: parseInt(form.age),
          occupation: form.occupation,
          email: form.email,
          password: form.password,
          confirm_password: form.confirmPassword,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] flex items-center justify-center px-4 py-10">

      {/* Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-10"
      >
        {/* Heading */}
        <h1 className="text-6xl font-bold text-white text-center">
          Create Account ✨
        </h1>

        <p className="text-center text-gray-300 mt-4 mb-8 text-xl">
          Join and start tracking smarter expenses
        </p>

        {/* Full Name */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full px-6 py-5 mb-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Age + Gender */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">

          <input
  type="number"
  name="age"
  placeholder="Age"
  value={form.age}
  min="18"
  onChange={(e) => {
    const value = e.target.value;

    /* allow empty for backspace/delete */
    if (value === "") {
      handleChange(e);
      return;
    }

    /* allow manual typing */
    if (/^\d+$/.test(value)) {
      handleChange(e);
    }
  }}
  onBlur={(e) => {
    if (e.target.value !== "" && Number(e.target.value) < 18) {
      setForm((prev) => ({
        ...prev,
        age: "18",
      }));
    }
  }}
  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>

          {/* ✅ Fixed Gender Dropdown */}
          <select
  name="gender"
  value={form.gender}
  onChange={handleChange}
  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
>
  {/* Hidden placeholder */}
  <option value="" disabled hidden className="text-black">
    Select Gender
  </option>

  <option value="Male" className="text-black">
    Male
  </option>

  <option value="Female" className="text-black">
    Female
  </option>

  <option value="Other" className="text-black">
    Other
  </option>
</select>
        </div>

        {/* Occupation */}
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={form.occupation}
          onChange={handleChange}
          className="w-full px-6 py-5 mb-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-6 py-5 mb-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password */}
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-5 text-gray-300"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-5">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-5 top-5 text-gray-300"
          >
            {showConfirm ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mb-5 text-lg">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-2xl font-semibold hover:scale-[1.01] transition"
        >
          Create My Account
        </button>

        {/* Footer */}
        <p className="text-center text-gray-300 mt-6 text-xl">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;