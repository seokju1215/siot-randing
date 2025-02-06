import './M-StoreRanding.css';
import { useEffect, useState } from 'react';


function Mobile(props) {

  return (
    <>
      <div className="m-section">
        <img className="m-content" src="/img/M-siotRandingForStore.svg" alt="모바일 Store randing img" />
      </div>
      <div className="footer">
        <div className = "email-section">
          <input type="email" placeholder="seeot@email.com / 이메일을 입력해주세요"
            onChange={(e) => { props.setEmail(e.target.value) }}
            className={`email-input ${props.submitted ? "submitted" : ""}`} />
          <div className="m-okbutton" onClick={props.handleSubmit}>확인</div>
        </div>
        {props.submitted && <p className="success-message">제출되었습니다!</p>}
      </div>
    </>)
}

export default Mobile;