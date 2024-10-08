import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/login">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </main>
  );
}