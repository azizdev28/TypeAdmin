import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  username: string;
  password: string | number;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Tekshirishni amalga oshirish
    if (validateForm()) {
      saveUserDataToLocal(username, password);
      alert("You have successfully registered!");
      navigate("/login");
    }
  };

  const saveUserDataToLocal = ({ username, password }: UserData): void => {
    localStorage.setItem("user", JSON.stringify({ username, password }));
  };

  const validateForm = (): boolean => {
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
      <h2 className="text-center h2">Register</h2>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
