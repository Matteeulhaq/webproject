// src/components/common/BackButton.jsx
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-88 left-4 z-30 p-2 rounded-full text-gray-800 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
      aria-label="Go back to previous page"
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </button>
  );
}

export default BackButton;

/* Alternative: Custom "<" SVG (uncomment to use instead of ChevronLeftIcon)
<button
  onClick={handleBack}
  className="fixed top-4 left-4 z-30 p-2 rounded-full text-gray-800 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
  aria-label="Go back to previous page"
>
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
</button>
*/