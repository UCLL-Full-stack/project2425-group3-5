import Header from "@components/header";
import AddRSVPform from "@components/rsvp/AddRSVPForm";

import { RsvpStatus, User } from "@types";
import Head from "next/head";

const CreateRSVPPage: React.FC = () => {
    const handleFormSubmit = async (formData: {attendee: User; rsvpStatus: RsvpStatus}): Promise<void> => {
        
    }

    return (
        <>
            <Head>
                <title>RSVP</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>Create Form</h2>
                    <AddRSVPform onSubmit={handleFormSubmit}/>
                </section>
            </main>
        </>
    )

}

export default CreateRSVPPage;