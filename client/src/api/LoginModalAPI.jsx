const axios = require('axios');

export function postLogin(state, onModalOffAction, onloginAction) {
  return axios
    .post(
      `${process.env.SERVER_URL}users/login`,
      {
        email: state.email,
        password: state.password,
      },
      {
        headers: {
          'Content-Type': `application/json`,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log('login 성공', res);
      onModalOffAction();
      onloginAction();
    });
}

export function signUp(state, handleToggle, setAfterSignUp) {
  return axios
    .post(`${process.env.SERVER_URL}users/signup`, {
      username: state.username,
      email: state.email,
      password: state.password,
    })
    .then(() => {
      console.log('회원가입 성공');
      handleToggle();
      setAfterSignUp('회원가입이 완료되었습니다! 로그인 하세요!');
    });
}

export function signUpGoogle(authorizationCode, onloginAction, onModalOffAction) {
  return axios
    .post(
      `${process.env.SERVER_URL}users/google`,
      {
        authorizationCode,
      },
      {
        headers: {
          'Content-Type': `application/json`,
        },
        withCredentials: true,
      }
    )
    .then(() => {
      console.log('구글 로그인 성공');
      onloginAction();
      onModalOffAction();
    });
}

export function signUpKakao(authorizationCode, onloginAction, onModalOffAction) {
  return axios
    .post(
      `${process.env.SERVER_URL}users/kakao`,
      {
        authorizationCode,
      },
      {
        headers: {
          'Content-Type': `application/json`,
        },
        withCredentials: true,
      }
    )
    .then(() => {
      console.log('카카오 로그인 성공');
      onloginAction();
      onModalOffAction();
    });
}

export function signOut(onlogoutAction) {
  return axios
    .delete(`${process.env.SERVER_URL}users/signout`, {
      headers: {
        'Content-Type': `application/json`,
      },
      withCredentials: true,
    })
    .then(() => {
      console.log('회원 탈퇴 성공');
      onlogoutAction();
      // ! 홈으로 이동 & 리팩토링
    });
}

export function logout() {
  return axios
    .post(
      `${process.env.SERVER_URL}users/logout`,
      {},
      {
        headers: {
          'Content-Type': `application/json`,
        },
        withCredentials: true,
      }
    )
    .then(() => {
      console.log('로그아웃 성공');
    });
}

export function dupliEmail(state, setIsDupli) {
  return axios
    .get(`${process.env.SERVER_URL}users/email/${state.email}`, {
      email: state.email,
    })
    .then(() => {
      // setIsDupli(false);
      console.log('중복 이메일 아님 사용 가능 ㅊㅋㅊㅋ');
    });
}

// * getAuth 필요없을듯
// function getAuth() {
//   return axios
//     .get(`${process.env.REACT_APP_SERVER_URL}/auth`, {
//       headers: {
//         'Content-Type': `application/json`,
//         // authorization: 'Bearer ' + sessionStorage.getItem('token'),
//       },
//       withCredentials: true,
//     })
//     .then(() => {
//       // setTokenState(sessionStorage.getItem('token'));
//       // setIsLogin(true);
//       // setUserInfo(res.data.data.userInfo);
//       // if (location.pathname === '/login') {
//       // useLocation으로 로그인 할때만 변경
//       // navigate('/');
//       // }
//       onloginAction();
//     })
//     .catch(console.log('getAuth error'));
// }
