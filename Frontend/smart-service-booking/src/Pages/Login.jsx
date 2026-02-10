import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await loginUser(email, password);

    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role); // 👈 REQUIRED

    alert("Login Successful");

    if (res.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/services");
    }

  } catch (err) {
    alert("Login failed");
  }
};


  <button onClick={() => navigate("/register")}>
  New user? Register
</button>


  return (
    <div className="auth-box">
      <h2>Login</h2>

      <input placeholder="Email"
      value={email}
        onChange={(e)=>setEmail(e.target.value)} />

      <input type="password" placeholder="Password" value={password}
        onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
