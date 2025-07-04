import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function OrderRecapPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (seconds === 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      <div className="container bg-light bg-gradient py-5 rounded-5 shadow-lg d-flex align-items-center justify-content-center flex-column">
        <h2>ordine inviato</h2>
        <p className="mt-3">
          Verrai reindirizzato alla home tra {seconds} secondi...
        </p>
      </div>
    </>
  );
}
