import "./App.css";
import { useEffect, useState } from "react";
import Desktop from "./D-StoreRanding.js";
import Mobile from "./M-StoreRanding.js";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase"; // Cloud Functions 가져오기

function App() {
  const [email, setEmail] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
  
    try {
      const response = await fetch("https://us-central1-siotranding.cloudfunctions.net/addEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setSubmitted(true);
        setEmail(""); // 입력 필드 초기화
      } else {
        alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error calling Cloud Function: ", error);
  
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {windowWidth < 600 && (
        <Mobile email={email} setEmail={setEmail} handleSubmit={handleSubmit} submitted = {submitted} setSubmitted = {setSubmitted} />
      )}
      {windowWidth >= 600 && (
        <Desktop email={email} setEmail={setEmail} handleSubmit={handleSubmit} submitted = {submitted} setSubmitted = {setSubmitted}/>
      )}
    </div>
  );
}

export default App;