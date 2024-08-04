'use client';
import { Typography } from "@mui/material"
import { useRouter } from "next/navigation";
import styles from './layout.module.css'

export default function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  return (
    <section className={styles.layout}>
      <Typography variant="h3" fontWeight={500} align="center" onClick={() => router.push('/login')} className={styles.logo}>🍷 Drunk House</Typography>
      <Typography variant="h5">로그인을 해주세요</Typography>
      {children}
    </section>
  )
}