
import './App.css';
import { useEffect, useState } from 'react';
import Desktop from './Desktop.js';
import Mobile from './Mobile.js';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";


function App() {
  let [email, setEmail] = useState('');
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async () => {
    if (!email) {
        alert("이메일을 입력해주세요.");
        return;
    }

    try {
        // Firestore의 'emails' 컬렉션에 데이터 추가
        await addDoc(collection(db, "emails"), {
            email: email,
            timestamp: new Date(),
        });
        alert("이메일이 저장되었습니다!");
        setEmail(""); // 입력 필드 초기화
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("저장 중 오류가 발생했습니다.");
    }
};


  return (
    <div>
      {windowWidth < 600 &&  <Mobile email = {email} setEmail = {setEmail} handleSubmit = {handleSubmit}/>}
      {windowWidth >= 600 && <Desktop email = {email} setEmail = {setEmail} handleSubmit = {handleSubmit}/>}
    </div>
  );
}

export default App;
