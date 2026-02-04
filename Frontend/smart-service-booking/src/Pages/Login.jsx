import { useState } from "react";
import { loginUser } from "../services/authApi";

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {
    try{
      const res = await loginUser(email,password);
      localStorage.setItem("token",res.token);
      alert("Login Success");
      console.log(email, password);
      
    }catch(err){
      alert(err.response?.data?.message || "Login Failed");
    }
  };

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
