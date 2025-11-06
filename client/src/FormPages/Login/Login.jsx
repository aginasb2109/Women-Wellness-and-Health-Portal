import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Login.css";
import Typography from '@mui/material/Typography';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/auth/login",
                {},
                {
                    params: {
                        username: username,
                        password: password
                    },
                }
            );

              localStorage.setItem("userId", res.data.id);
              localStorage.setItem("userName", res.data.username);
              localStorage.setItem("role", res.data.role);
              const role=localStorage.getItem("role");
              console.log(role);

              console.log("Stored User ID:", localStorage.getItem("userId"));
        console.log("Stored User Name:", localStorage.getItem("userName"));

            if (res.status === 200) {
                console.log("login successfully");
                toast.success("login successfully");
                if(role==='USER'){
                    navigate("/dashboard");
                }
                else if(role==='ADMIN'){
                    navigate("/admin/dashboard");
                }
                
            } else {
                console.log("login failed");
                toast.error("authentication failed");
            }
        } catch (err) {
            console.log(err);
            toast.error("Login failed");
        }
    };

    return (
        <div className="LoginContainer">
            <form onSubmit={handleSubmit} className="LoginCard">
                <Typography variant="h4" component="h4" className="h1Login my-2">
                    Login
                </Typography>
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
                    <Button
                        variant="contained"
                        type="submit"
                        className="LoginButton"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
