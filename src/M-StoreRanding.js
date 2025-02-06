import './M-StoreRanding.css';
import { useEffect, useState } from 'react';


function Mobile(props) {

  return (
    <>
      <div className="m-section">
        <img className="m-content" src="/img/M-siotRandingForStore.svg" alt="모바일 Store randing img" />
      </div>
      <div>
        <div className="footer">
          <input type="email" placeholder="seeot@email.com / 이메일을 입력해주세요" onChange={(e) => { props.setEmail(e.target.value) }} />
          <div className="m-okbutton" onClick={props.handleSubmit}>확인</div>
        </div>
      </div>
      <div className="footer">
        <input type="email" placeholder="seeot@email.com / 이메일을 입력해주세요" onChange={(e) => { props.setEmail(e.target.value) }} />
        <div className="m-okbutton" onClick={props.handleSubmit}>확인</div>
      </div>
    </>)
}

export default Mobile;