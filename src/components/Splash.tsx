import { useEffect, useState } from "react";
import logo from "@/assets/logo-royal.svg";

export default function Splash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("rr_splash_seen");
    if (!seen) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        localStorage.setItem("rr_splash_seen", "1");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[hsl(var(--brand-black))] text-foreground">
      <img src={logo} alt="Royal Royal Ethnic" className="h-14 w-auto animate-scale-in" />
      {/* Curtain animation */}
      <div className="absolute inset-0 bg-[hsl(var(--brand-black))] animate-curtain-up" aria-hidden />
      <button
        onClick={() => { localStorage.setItem("rr_splash_seen", "1"); setShow(false); }}
        className="absolute bottom-6 text-xs text-muted-foreground underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
      >
        Skip animation
      </button>
    </div>
  );
}
