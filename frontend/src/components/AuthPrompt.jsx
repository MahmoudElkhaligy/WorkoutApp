import { Link } from 'react-router-dom';

const AuthPrompt = ({ text, linkText, linkTo }) => {
  return (
    <div className="auth-prompt">
      <span>{text}</span>
      <Link className="link" to={linkTo}>{linkText}</Link>
    </div>
  );
};

export default AuthPrompt;
