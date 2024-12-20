import Header from '@components/header';
import styles from '@styles/home.module.css';
import Head from 'next/head';

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
                    Welcome to this private eventing organising website!
                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;
