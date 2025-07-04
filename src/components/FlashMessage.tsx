import { useEffect, useState } from "react";

interface FlashMessageProps {
  message: string;
  type: string;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setRender(false), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!render) return null;

  return (
    <div
      className={`fixed top-10 right-6 px-5 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-300 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        ${type === "success" ? "bg-emerald-600" : "bg-red-600"}
      `}>
      {message}
    </div>
  );
};

export default FlashMessage;
