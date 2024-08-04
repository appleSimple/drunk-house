'use client';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { BaseInput } from '@/components/base-input';
import { BaseButton } from '@/components/base-button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Gender } from '../../constants/enum/gender';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

import { UserBody, duplicateCheck, signup } from '@/config/api/user-service';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';

/**
 * TODO
 * 1. 아이디 정규식: 공백 미허용, 영어와 숫자만 허용
 * 2. 비밀번호 정규식: 공백 미허용, 영어, 숫자, 특수문자만 허용. 캡스락 경고창 표시, 자동으로 소문자로 변환
 * 3. API 연동
 */
export default function Signup() {
  const [userName, setUserName] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState<UserBody['gender']>(Gender.MALE);
  const [isCheckDuplication, setIsCheckDuplication] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsCheckDuplication(false);
  }, [userName]);

  useEffect(() => {
    console.log(userName, passwordRef.current?.value, birthRef.current?.value, nicknameRef.current?.value);
    
    if (userName && passwordRef.current?.value && birthRef.current?.value && nicknameRef.current?.value) {
      setIsValid(true);
    } else setIsValid(false);

    console.log(isValid);
    
  }, [userName, passwordRef, birthRef, nicknameRef]);

  const handleGender = (e: ChangeEvent, value: UserBody['gender']) => {
    setGender(value as UserBody['gender']);
  };

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!isCheckDuplication) return;
    if (!isValid) return;

    const body = {
      userName: userName,
      password: passwordRef.current?.value,
      birth: dayjs(birthRef.current?.value).format('YYYYMMDD'),
      nick: nicknameRef.current?.value,
      gender,
    };

    try {
      // TODO type 정의하기
      const response = await signup(body);
    } catch {
      console.error('error');   
    }
  }

  async function checkDuplication() {
    const value = userName;
    if (!value) return;

    try {
      await duplicateCheck(value);
      setIsCheckDuplication(true);
    } catch {
      setIsCheckDuplication(false);
    }
    
    console.log(isCheckDuplication);
  }

  return (
    <>
      <div className={styles.signup}>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.userId}>
            <TextField value={userName} onChange={handleUserName} label="아이디" variant="filled" size="small" name="username" autoComplete="username" required />
            <Button onClick={checkDuplication} variant="outlined">중복 확인</Button>
          </div>
          <TextField inputRef={passwordRef} label="비밀번호" variant="filled" size="small" name="password" autoComplete="current-password" required />
          <DatePicker inputRef={birthRef} label="생년월일" />
          <TextField inputRef={nicknameRef} label="닉네임" variant="filled" size="small" name="nickname" autoComplete="nickname" required />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={gender}
              onChange={handleGender}
            >
              <FormControlLabel value={Gender.MALE} control={<Radio />} label="남자" />
              <FormControlLabel value={Gender.FEMALE} control={<Radio />} label="여자" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant='contained' size='large'>회원가입</Button>
        </form>
      </div>
    </>
  );
}