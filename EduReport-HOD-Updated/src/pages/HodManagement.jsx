import { useState } from "react";
import { UserPlus, Users, Trash2, ShieldCheck } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getFacultyAccounts, saveFacultyAccounts, getStudents } from "../data/students";

export default function HodManagement() {
  const [faculties, setFaculties] = useState(getFacultyAccounts);
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "Computer Science & Engineering", designation: "Assistant Professor" });
  const [message, setMessage] = useState("");
  const students = getStudents();

  function update(field, value) { setForm(current => ({ ...current, [field]: value })); }

  function addFaculty(event) {
    event.preventDefault();
    if (faculties.some(item => item.email.toLowerCase() === form.email.trim().toLowerCase())) {
      setMessage("A faculty account with this email already exists.");
      return;
    }
    const updated = [...faculties, { ...form, id: `faculty-${Date.now()}`, name: form.name.trim(), email: form.email.trim().toLowerCase(), role: "faculty" }];
    saveFacultyAccounts(updated);
    setFaculties(updated);
    setForm({ name: "", email: "", password: "", department: "Computer Science & Engineering", designation: "Assistant Professor" });
    setMessage("Faculty account created successfully. Share the login details with the faculty member.");
  }

  function removeFaculty(id) {
    const updated = faculties.filter(item => item.id !== id);
    saveFacultyAccounts(updated);
    setFaculties(updated);
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <section className="page-content">
          <div className="page-title">
            <div><div className="welcome-label">HOD CONTROL PANEL</div><h1>Faculty Management</h1><p>Create faculty logins and oversee department performance.</p></div>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon"><Users size={21} /></div><div className="stat-content"><p>Total Faculty</p><h2>{faculties.length}</h2><small>Active faculty accounts</small></div></div>
            <div className="stat-card"><div className="stat-icon"><ShieldCheck size={21} /></div><div className="stat-content"><p>Total Students</p><h2>{students.length}</h2><small>Student records in the system</small></div></div>
          </div>
          <div className="hod-management-grid">
            <div className="section-card">
              <div className="card-header"><div><h3><UserPlus size={18} /> Add New Faculty</h3><p>Create a separate login for a faculty member.</p></div></div>
              <form className="hod-form" onSubmit={addFaculty}>
                <label>Faculty Name<input required value={form.name} onChange={e => update("name", e.target.value)} placeholder="Enter faculty name" /></label>
                <label>Faculty Email<input required type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="name@edureport.com" /></label>
                <label>Temporary Password<input required minLength={6} value={form.password} onChange={e => update("password", e.target.value)} placeholder="At least 6 characters" /></label>
                <label>Department<input required value={form.department} onChange={e => update("department", e.target.value)} /></label>
                <label>Designation<select value={form.designation} onChange={e => update("designation", e.target.value)}><option>Assistant Professor</option><option>Associate Professor</option><option>Professor</option><option>Lecturer</option></select></label>
                {message && <p className="hod-form-message">{message}</p>}
                <button className="primary-button" type="submit"><UserPlus size={16} /> Create Faculty Account</button>
              </form>
            </div>
            <div className="section-card">
              <div className="card-header"><div><h3>Faculty Accounts</h3><p>These faculty members can sign in and view student performance.</p></div></div>
              <div className="hod-faculty-list">
                {faculties.map(item => <div className="hod-faculty-row" key={item.id}><div className="hod-faculty-avatar">{item.name.charAt(0).toUpperCase()}</div><div className="hod-faculty-info"><strong>{item.name}</strong><span>{item.email}</span><small>{item.designation || "Faculty"} · {item.department || "Department not set"}</small></div>{item.id !== 100 && <button className="hod-delete-button" title={`Remove ${item.name}`} onClick={() => removeFaculty(item.id)}><Trash2 size={16} /></button>}</div>)}
              </div>
            </div>
          </div>
          <div className="section-card hod-note"><h3>Department performance access</h3><p>All active faculty accounts can sign in through <strong>Faculty Login</strong> and use the existing Students, Reports, Analytics and Dashboard pages to review student performance. The HOD can also access those pages from the main dashboard.</p></div>
        </section>
      </main>
    </div>
  );
}
