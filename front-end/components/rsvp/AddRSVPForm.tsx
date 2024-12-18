import { User } from "@types";
import React from "react";


type Props = {
    onSubmit: (formData: {attendee: User}) => void;
  };

const AddRSVPform: React.FC<Props>  = ({onSubmit}) => {
    return(
        <>
        </>
    )
}

export default AddRSVPform

