import Head from "next/head";

import React from "react";
import styles from "./layout.module.css";

import Progress from "./progress";
import AlertStack from "./alert/alertStack";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Dining Reservation Service</title>
      </Head>
      <header>
      </header>
      <main className={styles.main}>
        {children}
        <Progress />
        <AlertStack />
      </main>
    </>
  );
}
