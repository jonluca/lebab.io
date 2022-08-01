import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("../components/Editor"), { ssr: false });
// Should this app be React? no! is it the fastest way to get something useful out the door? yes!
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lebab</title>
        <meta
          name="description"
          content="Generate lots of HTTP requests from your UI, for network monitoring or HAR exports"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Lebab</h1>
        <CodeEditor />
        <footer className={styles.footer}>
          <a href="https://github.com/lebab/lebab" target="_blank" rel="noreferrer" className={styles.footerText}>
            Lebab source code
          </a>
          <a href="https://github.com/lebab/lebab" target="_blank" rel="noreferrer" className={styles.footerText}>
            Site source code
          </a>
        </footer>
      </main>
    </div>
  );
};

export default Home;
