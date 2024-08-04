'use client';

import Typography from "@mui/material/Typography"
import { useRouter } from "next/navigation";
import styles from './layout.module.css'

export default function SignupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  
  return (
    <section className={styles.layout}>
      <Typography variant="h3" fontWeight={500} align="center" onClick={() => router.push('/login')} className={styles.logo}>🍷 Drunk House</Typography>
      <Typography variant="h5">모든 정보를 입력해주세요</Typography>
      {children}
    </section>
  )
}