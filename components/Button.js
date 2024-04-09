import classes from "../styles/Button.module.css";

export default function Button({ className, children, onClick }) {
  return (
    <div className={`${classes.button} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
