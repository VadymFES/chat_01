import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Aside from '@/components/Aside/Aside'
import MessageList from '@/components/MessageList/MessageList'



export default function Home() {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Aside />
        <section className={styles.container}>
          <MessageList />
        </section>
      </main>
    </>
  )
}
