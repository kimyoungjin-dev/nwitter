import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import { Link } from "react-router-dom";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className="authContainer">
      <div className="auth-nav-var">
        <div className="auth-nav-var-left">
          <FontAwesomeIcon
            className="auth-faTwitter"
            icon={faTwitter}
            color={"#04AAFF"}
            size="2x"
          />
          <span>Twitter 로그인</span>
        </div>
        <div className="auth-nav-var-center">
          <FontAwesomeIcon
            className="auth-faTwitter"
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
          />
        </div>
        <div className="auth-nav-var-left-right">
          <div>
            <Link to="/">도움말</Link>
          </div>
          <div>
            <Link to="/">문의하기</Link>
          </div>
        </div>
      </div>
      <AuthForm />
      <div className="authForm-find">
        <span>회원가입</span>
        <span>트위터계정찾기 | 비밀번호 재설정</span>
      </div>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>

      <div className="mobile-check">
        <Link to="/">모바일에서 트위터 계정을 확인할 수 있습니다.</Link>
      </div>

      <span className="auth-forgetPassword">비밀번호를 잊어버리셨나요?</span>
      <div className="no-mobile">
        <div className="auth-forgetPassword">
          <span>크기를 줄이거나 핸드폰으로 접속하세요</span>
        </div>
      </div>
    </div>
  );
};
export default Auth;
