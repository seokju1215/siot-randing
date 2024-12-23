import './Desktop.css';
import { useEffect, useState } from 'react';


function Desktop(props) {

  return (
    <div className="container">
      <div className="header">
        <img className="siot-logo" src="/img/siotLogo.svg" alt="시옷 헤더 로고" />
        <div className="sns-button" onClick={() => {
          window.open("https://www.instagram.com/seok___ju/")
        }}>SNS</div>
      </div>
      <div className="content-section">
        <div className="white-section">
          <img className="white-content" src="/img/white-content-desktop.svg" alt="데스크탑 white section content" />
        </div>
        <div className="black-section">
          <img className="black-content" src="/img/black-section-content.svg" alt="데스크탑 black section content" />
          <div className="email-input">
            <input type="email" placeholder="seeot@email.com / 이메일을 입력해주세요" onChange={(e) => { props.setEmail(e.target.value) }} />
            <div className="okbutton" onClick={props.handleSubmit}>확인</div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Desktop;