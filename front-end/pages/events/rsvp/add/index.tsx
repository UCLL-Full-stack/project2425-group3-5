import Header from "@components/header";

import Head from "next/head";

const CreateRSVPPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>RSVP</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>Create Form</h2>
                </section>
            </main>
        </>
    )

}

export default CreateRSVPPage;