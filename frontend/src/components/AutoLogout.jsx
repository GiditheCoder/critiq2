import { useEffect, useRef } from "react";
import { useClerk } from "@clerk/clerk-react";

const AutoLogout = ({ timeout = 10 * 60 * 1000 }) => { // default 10 minutes
  const { signOut } = useClerk();
  const timerRef = useRef();

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      console.log("⏳ Auto-logging out due to inactivity");
      signOut();
    }, timeout);
  };

  useEffect(() => {
    // Track user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // start timer on mount

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return null;
};

export default AutoLogout;
