'use client';
import { useRouter } from 'next/navigation';
import styles from './layout.module.css';

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  return (
    <section>
      <h1 onClick={() => router.push('/home')} className={styles.logo}>🍷 Drunk House</h1>
      {children}
    </section>
  )
}