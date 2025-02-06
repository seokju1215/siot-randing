import './D-StoreRanding.css';
import { useEffect, useState } from 'react';


function Desktop(props) {

  return (
    <>
      <div className="d-section">
        <img className="d-content" src="/img/D-siotRandingForStore.svg" alt="데스크탑 Store randing img" />
      </div>
      <div className="footer">
        <input type="email" placeholder="seeot@email.com / 이메일을 입력해주세요" onChange={(e) => { props.setEmail(e.target.value) }} />
        <div className="m-okbutton" onClick={props.handleSubmit}>확인</div>
      </div>
    </>)
}

export default Desktop;