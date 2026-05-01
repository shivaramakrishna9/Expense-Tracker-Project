import { useState } from "react";
import {
  Wallet,
  Target,
  Home,
  CreditCard,
  Tv,
  TrendingUp,
  Shield,
  MoreHorizontal,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Reusable Input */
function InputField({
  icon,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>

      <input
        type="text"
        inputMode="numeric"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#111827] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function FormPage() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    salary: "",
    savings: "",
    emi: "",
    rent: "",
    subscriptions: "",
    sip: "",
    insurance: "",
    others: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    /* allow empty = backspace works */
    if (value === "") {
      setData((prev) => ({
        ...prev,
        [name]: "",
      }));
      setError("");
      return;
    }

    /* allow digits only */
    if (!/^\d+$/.test(value)) return;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* Prevent Enter key submit */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      salary,
      savings,
      emi,
      rent,
      subscriptions,
      sip,
      insurance,
      others,
    } = data;

    /* All fields required */
    const allFilled = Object.values(data).every(
      (value) => value !== ""
    );

    if (!allFilled) {
      setError("Please fill all fields.");
      return;
    }

    /* Salary must be > 0 */
    if (Number(salary) <= 0) {
      setError("Monthly salary must be greater than 0.");
      return;
    }

    /* Savings must be > 0 */
    if (Number(savings) <= 0) {
      setError("Expected savings must be greater than 0.");
      return;
    }

    /* Remaining fields >= 0 automatically by digits only */
    const expenseFields = [
      emi,
      rent,
      subscriptions,
      sip,
      insurance,
      others,
    ];

    const hasNegative = expenseFields.some(
      (item) => Number(item) < 0
    );

    if (hasNegative) {
      setError("Expenses cannot be less than 0.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError("No token found. Please login again.");
      return;
    }

    const payload = {
      monthly_salary: parseInt(salary),
      expected_savings: parseInt(savings),
      subscriptions: [
        { category: "EMI", amount: parseInt(emi) },
        { category: "Rent", amount: parseInt(rent) },
        { category: "Subscriptions", amount: parseInt(subscriptions) },
        { category: "SIP", amount: parseInt(sip) },
        { category: "Insurance", amount: parseInt(insurance) },
        { category: "Others", amount: parseInt(others) },
      ],
    };

    try {
      const response = await fetch('http://localhost:8000/subscriptions/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to save financial data');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0B1120] to-[#111827] px-4 py-10 flex justify-center">

      {/* Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

      {/* Main Card */}
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="relative z-10 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-10"
      >
        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8 text-sm">

          <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
            <CheckCircle size={16} />
            Account Created
          </span>

          <span className="px-5 py-2 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
            Financial Setup
          </span>

        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-white text-center">
          Monthly Finance Setup
        </h1>

        <p className="text-center text-gray-400 mt-3 mb-10 text-lg">
          Configure your monthly income, goals & recurring commitments
        </p>

        {/* Income */}
        <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Income & Goals
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              icon={<Wallet size={18} />}
              name="salary"
              value={data.salary}
              placeholder="Monthly Salary"
              onChange={handleChange}
            />

            <InputField
              icon={<Target size={18} />}
              name="savings"
              value={data.savings}
              placeholder="Expected Savings"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Recurring Monthly Expenses
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <InputField
              icon={<CreditCard size={18} />}
              name="emi"
              value={data.emi}
              placeholder="EMI"
              onChange={handleChange}
            />

            <InputField
              icon={<Home size={18} />}
              name="rent"
              value={data.rent}
              placeholder="Rent"
              onChange={handleChange}
            />

            <InputField
              icon={<Tv size={18} />}
              name="subscriptions"
              value={data.subscriptions}
              placeholder="Subscriptions"
              onChange={handleChange}
            />

            <InputField
              icon={<TrendingUp size={18} />}
              name="sip"
              value={data.sip}
              placeholder="SIP Investment"
              onChange={handleChange}
            />

            <InputField
              icon={<Shield size={18} />}
              name="insurance"
              value={data.insurance}
              placeholder="Insurance"
              onChange={handleChange}
            />

            <InputField
              icon={<MoreHorizontal size={18} />}
              name="others"
              value={data.others}
              placeholder="Other Expenses"
              onChange={handleChange}
            />

          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mb-6 text-lg">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.01] transition"
        >
          Save & Continue →
        </button>
      </form>
    </div>
  );
}

export default FormPage;