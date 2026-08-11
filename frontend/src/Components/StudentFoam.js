import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function StudentForm() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ rollNumber: "", name: "", branch: "", email: "", 
    phone: "", semester: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = async () => {
    if (!form.rollNumber || !form.name || !form.branch || !form.email) 
      return alert("RollNumber, Name, Branch, Email required");
    try {
      if (editingId) await axios.put(`http://localhost:5000/students/${editingId}`, form);
      else await axios.post("http://localhost:5000/students", form);
      setForm({ rollNumber: "", name: "", branch: "", email: "", phone: "", semester: "" });
      setEditingId(null);
      fetchStudents();
    } catch (err) { console.error(err); }
  };

  const editStudent = s => { setForm({ ...s }); setEditingId(s._id); };
  const deleteStudent = async id => { await axios.delete(`http://localhost:5000/students/${id}`); fetchStudents(); };

  return (
    <div className="container">
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
      <input placeholder="Roll Number" value={form.rollNumber} onChange={e => setForm({...form, rollNumber: e.target.value})} />
      <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Branch" value={form.branch} onChange={e => setForm({...form, branch: e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
      <input placeholder="Semester" value={form.semester} onChange={e => setForm({...form, semester: e.target.value})} />
      <br />
      <button onClick={handleSubmit}>{editingId ? "Update" : "Add Student"}</button>

      <h3>Student List</h3>
      <table>
        <thead>
          <tr>
            <th>Roll No</th><th>Name</th><th>Branch</th><th>Email</th><th>Phone</th><th>Semester</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.rollNumber}</td><td>{s.name}</td><td>{s.branch}</td><td>{s.email}</td><td>{s.phone}</td><td>{s.semester}</td>
              <td className="actions">
                <button onClick={() => editStudent(s)}>Edit</button>
                <button onClick={() => deleteStudent(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}