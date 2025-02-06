import './D-StoreRanding.css';
import { useEffect, useState } from 'react';


function Desktop(props) {

  return (
    <>
      <div className="d-section">
        <img className="d-content" src="/img/D-siotRandingForStore.svg" alt="데스크탑 Store randing img" />
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

export default Desktop;