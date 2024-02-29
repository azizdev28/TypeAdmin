import { TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = getUserDataFromLocal();
      if (
        userData &&
        userData.username === username &&
        userData.password === password
      ) {
        navigate("/");
      } else {
        setError("Invalid username or password.");
      }
    }
  };

  const getUserDataFromLocal = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };

  const validateForm = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required.");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <TextInput
              className="w-50"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
