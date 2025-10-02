import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import "./Register.css"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const roles = [
    { value: 'USER', label: 'USER' },
    { value: 'ADMIN', label: 'ADMIN' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/register", {}, {
        params: { username, password, role },
      });

      if (res.status === 200) {
        toast.success("Registered Successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Failed to register!");
      console.log(error);
    }
  };

  return (
    <div className="RegisterContainer">
      <form onSubmit={handleSubmit} className="RegisterCard">
        <h2 className="h1Register">Register</h2>
        <div className="d-flex flex-column gap-3">
          <TextField
            id="outlined-username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            id="outlined-password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="outlined-select-role"
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            type="submit"
            className="RegisterButton"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
