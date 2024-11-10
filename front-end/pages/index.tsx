import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Events</title>
                <meta name="description" content="Event app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
        <span>
          <h1>Welcome!</h1>
        </span>

                <div className={styles.description}>
                    <p>

                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;
