'use client';
import { FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import styles from './page.module.css';
import { BaseInput } from '@/components/base-input';
import { BaseButton } from '@/components/base-button';
import { login } from '@/config/api/user-service';
import { useUserStore } from '@/store/useUserStore';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

/**
 * TODO
 * 1. 아이디 정규식: 공백 미허용, 영어와 숫자만 허용
 * 2. 비밀번호 정규식: 공백 미허용, 영어, 숫자, 특수문자만 허용. 캡스락 경고창 표시, 자동으로 소문자로 변환
 */
export default function Login() {
  const router = useRouter();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);
  const reset = useUserStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, []);
  
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userNameRef.current && passwordRef.current) {
      const body = {
        userName: userNameRef.current.value,
        password: passwordRef.current.value
      }

      try {
        const response = await login(body);
        updateUserInfo(response.data);
        router.push('/home');
      } catch(error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className={styles.login}>
        <form className={styles.form} onSubmit={submit}>
          <TextField inputRef={userNameRef} label="아이디" variant="filled" size="small" name="username" autoComplete="username" required />
          <TextField inputRef={passwordRef} type='password' label="비밀번호" variant="filled" size="small" name="password" autoComplete="current-password" required />
          <Button type="submit" variant='contained' size='large'>로그인</Button>
        </form>
        <Link href="/signup">회원이 아니신가요?</Link>
      </div>
    </>
  );
}