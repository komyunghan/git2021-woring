import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import App from './App'

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <App />
    </div>
  )
}

export default Home
