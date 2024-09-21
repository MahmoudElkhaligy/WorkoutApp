import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import AuthPrompt from "../components/AuthPrompt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>

      <button disabled={isLoading}>Log in</button>

      <AuthPrompt 
        text="Do not have an account ?" 
        linkText="Sign up"
        linkTo="/register" 
      />

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
