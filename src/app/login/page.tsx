'use client';
import styles from './page.module.css';
import { FormEvent, useRef } from 'react';
import { BaseInput } from '@/components/base-input';
import { BaseButton } from '@/components/base-button';
import { login } from '@/config/api/userService';

/**
 * TODO
 * 1. 아이디 정규식: 공백 미허용, 영어와 숫자만 허용
 * 2. 비밀번호 정규식: 공백 미허용, 영어, 숫자, 특수문자만 허용. 캡스락 경고창 표시, 자동으로 소문자로 변환
 */
export default function Login() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userNameRef.current && passwordRef.current) {
      const body = {
        userName: userNameRef.current.value,
        password: passwordRef.current.value
      }

      try {
        const response = await login(body);
        console.log('response', response);
        // TODO: 메인으로 이동
      } catch(error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className={styles.login}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={submit}>
          <BaseInput ref={userNameRef} label="아이디" variant="standard" size="small" name="username" autoComplete="username" required />
          <BaseInput ref={passwordRef} label="비밀번호" variant="standard" size="small" name="password" autoComplete="current-password" required />
          <BaseButton type="submit">로그인</BaseButton>
        </form>
      </div>
    </>
  );
}