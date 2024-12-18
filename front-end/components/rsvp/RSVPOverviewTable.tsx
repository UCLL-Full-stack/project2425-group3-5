
import RSVPService from "@services/RSVPservice";
import { RSVP } from "@types";
import React from "react";

type Props = {
    rsvps: Array<RSVP>;
}

const RSVPOverviewtable: React.FC<Props>  = ({rsvps}: Props) => {
    const handleUpdateStatus = async (rsvp: RSVP) => {
        await RSVPService.updateRsvp(rsvp);
        window.location.reload();
    };

    const handleDelete = async (id: number) => {
        await RSVPService.deleteRsvp(id);
        window.location.reload();
    };

    return (
        <>
        <div className="contrainer mt-5">
            <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
            <tr>
                <th className="text-center">Event</th>
                <th className="text-center">User</th>
                <th className="text-center">Status</th>
                <th className="text-center">Delete</th>
            </tr>
            </thead>
            <tbody>
                    {rsvps.map((rsvp, index) => (
                        <tr key={index}>
                            <td className="text-center">{rsvp.event.title}</td>
                            <td className="text-center">{rsvp.user.email}</td>
                            <td className="text-center">{rsvp.status} <button className="btn btn-warning btn-sm me-2" onClick={() => {handleUpdateStatus(rsvp)}}>Switch</button></td>
                            <td className="text-center"><button className="btn btn-danger btn-sm" onClick={() => {handleDelete(rsvp.id)}}>Delete</button></td>
                        </tr>
                    ))}
            </tbody>
            </table>
        </div>
        </>
    )
}

export default RSVPOverviewtable