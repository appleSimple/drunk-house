'use client';
import { FormEvent, useRef, useState } from 'react';
import styles from './page.module.css';
import { BaseInput } from '@/components/base-input';
import { BaseButton } from '@/components/base-button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Gender } from '../constants/enum/gender';

/**
 * TODO
 * 1. 아이디 정규식: 공백 미허용, 영어와 숫자만 허용
 * 2. 비밀번호 정규식: 공백 미허용, 영어, 숫자, 특수문자만 허용. 캡스락 경고창 표시, 자동으로 소문자로 변환
 * 3. API 연동
 */
export default function Signup() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState(Gender.MALE);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userNameRef.current && passwordRef.current) {
      const loginData = {
        userName: userNameRef.current.value,
        password: passwordRef.current.value,
        birth: birthRef.current?.value,
        nickname: nicknameRef.current?.value,
        gender,
      }

      console.log('loginData', loginData);
    }
  }

  return (
    <>
      <div className={styles.login}>
        <h1>Signup</h1>
        <form className={styles.form} onSubmit={submit}>
          <BaseInput ref={userNameRef} label="아이디" variant="standard" size="small" name="username" autoComplete="username" required />
          <BaseInput ref={passwordRef} label="비밀번호" variant="standard" size="small" name="password" autoComplete="current-password" required />
          <DatePicker inputRef={birthRef} label="생년월일" />
          <BaseInput ref={nicknameRef} label="닉네임" variant="standard" size="small" name="nickname" autoComplete="nickname" required />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={gender}
              onChange={handleChange}
            >
              <FormControlLabel value={Gender.MALE} control={<Radio />} label="남자" />
              <FormControlLabel value={Gender.FEMALE} control={<Radio />} label="여자" />
            </RadioGroup>
          </FormControl>
          <BaseButton type="submit">회원가입</BaseButton>
        </form>
      </div>
    </>
  );
}