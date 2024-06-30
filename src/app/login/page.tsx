'use client';
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

/**
 * TODO: 전체 input 스타일 정의하여 임포트해서 사용하기
 */
const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

/**
 * TODO
 * 1. 아이디 정규식: 공백 미허용, 영어와 숫자만 허용
 * 2. 비밀번호 정규식: 공백 미허용, 영어, 숫자, 특수문자만 허용. 캡스락 경고창 표시, 자동으로 소문자로 변환
 * 3. API 연동
 */
export default function Login() {
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form className={styles.form}>
        <CustomTextField label="아이디" variant="standard" size="small" />
        <CustomTextField label="비밀번호" variant="standard" size="small" type="password" />
      </form>
    </div>
  );
}
