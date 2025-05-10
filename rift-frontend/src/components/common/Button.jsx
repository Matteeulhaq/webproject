// src/components/common/Button.jsx
function Button({ children, onClick, className = "", ...props }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded bg-primary-black text-primary-white ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  export default Button;