import "./App.css";
import { useEffect, useState } from "react";
import Desktop from "./D-StoreRanding.js";
import Mobile from "./M-StoreRanding.js";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase"; // Cloud Functions 가져오기

function App() {
  const [email, setEmail] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

      const result = await response.json();

      if (!response.ok) {
        // 🔴 중복된 이메일 메시지 확인
        if (result.error) {
          if (result.error.includes("이미 저장된 이메일")) {
            alert("이미 저장된 이메일입니다.");
          } else if (result.error.includes("Invalid email format")) {
            alert("타당하지 않은 이메일입니다. 올바른 이메일 형식을 입력해주세요.");
          } else {
            alert(`요청 실패: ${result.error}`);
          }
        }
        return;
      }

      console.log("Cloud Function 응답:", result);
      alert("이메일이 저장되었습니다!");
      setEmail(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error calling Cloud Function: ", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {windowWidth < 600 && (
        <Mobile email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
      )}
      {windowWidth >= 600 && (
        <Desktop email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;