import "./notification.css";

function Notification({ text }) {
  return (
    <article className="alert">
      <h1 className="alert__text">{text}</h1>
    </article>
  );
}

export default Notification;
