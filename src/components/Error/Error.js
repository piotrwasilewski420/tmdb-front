import './Error.css';

const Error = (props) => {
  return (
    <div className="error">
      <p className="error__message">{props.message}</p>
    </div>
  );
};

export default Error;
