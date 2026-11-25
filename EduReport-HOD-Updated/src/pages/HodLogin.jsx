import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Mail, Lock } from "lucide-react";
import { hodAccount } from "../data/students";

export default function HodLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() === hodAccount.email && password === hodAccount.password) {
      localStorage.setItem("currentUser", JSON.stringify(hodAccount));
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid HOD email or password.");
    }
  }

  return (
    <div className="auth-page faculty-auth">
      <div className="auth-brand-panel">
        <button className="back-login-button" onClick={() => navigate("/")}><ArrowLeft size={17} /> Back</button>
        <div className="auth-brand"><Building2 size={32} /><span>EduReport</span></div>
        <div className="auth-panel-content">
          <span>HOD PORTAL</span>
          <h1>Lead your department with clarity.</h1>
          <p>Create faculty accounts, oversee academic activity and review student performance across the department.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-heading">
            <div className="auth-icon faculty-icon"><Building2 size={23} /></div>
            <h2>HOD Login</h2>
            <p>Sign in to manage department faculty.</p>
          </div>
          <form onSubmit={login} className="auth-form">
            <label>HOD Email</label>
            <div className="auth-input"><Mail size={18} /><input type="email" required placeholder="hod@edureport.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <label>Password</label>
            <div className="auth-input"><Lock size={18} /><input type="password" required placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} /></div>
            {error && <div className="auth-error">{error}</div>}
            <button className="auth-submit">HOD Sign In</button>
          </form>
          <div className="demo-box"><strong>Demo HOD Account</strong><span>hod@edureport.com</span><span>Password: hod123</span></div>
        </div>
      </div>
    </div>
  );
}
