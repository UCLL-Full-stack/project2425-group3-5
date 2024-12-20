import { User } from "@types";
import React from "react";


type Props = {
    onSubmit: (formData: {user: User; event:Event}) => void;
    };

const AddRSVPform: React.FC<Props>  = ({onSubmit}) => {
    return(
        <>
        </>
    )
}

export default AddRSVPform

