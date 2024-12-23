import './Mobile.css';
import { useEffect, useState } from 'react';


function Mobile(props) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '공유 ㅇㅇ',
          text: '공유 ㅇㅇ',
          url: window.location.href,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('이 브라우저는 공유를 지원하지 않습니다.');
    }
  };


  return (
    <>
      <div className="m-header">
        <div className="m-header-box">
          <div className='m-SNS-button' onClick={() => {
            window.open("https://www.instagram.com/seok___ju/")
          }}>SNS</div>
          <div className="center">
            <img className="mobile-siot-logo" src="/img/siotLogo.svg" alt="시옷 헤더 로고" />
          </div>
          <div className="share-button" onClick={handleShare}>
            <img className="share-button" src="/img/share.svg" />
          </div>
        </div>
      </div>
      <div className="m-white-section">
        <img className="m-white-content" src="/img/m-white-section.svg" alt="모바일 white section content" />
      </div>
      <div className="m-black-section">
        <img className="m-black-content" src="/img/m-black-section.svg" alt="모바일 black section content" />
      </div>
      <div className="footer">
        <input type="email" placeholder="seeot@email.com / 이메일을 입력해주세요" onChange={(e) => { props.setEmail(e.target.value) }} />
        <div className="m-okbutton" onClick={props.handleSubmit}>확인</div>
      </div>
    </>)
}

export default Mobile;