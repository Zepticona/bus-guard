import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Profile from '../components/Profile'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bus Guard</title>
        <meta name="description" content="Bus Guard - Secure Transporation for Women" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Profile />
      </main>
    </div>
  )
}
