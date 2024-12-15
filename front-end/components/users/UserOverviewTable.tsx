import { Event } from '@types';
import React from 'react'

type Props = {
    event: Event;
}

const UserOverviewTable: React.FC<Props> = ({event}: Props) => {
    console.log('Event passed to UserOverviewTable:', event);
    return (
        <>
            <h2>Users of a event {event.title}</h2>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">username</th>
                </tr>
                </thead>
                <tbody>
                {event.users && event.users.length > 0 ? (
                    event.users.map((user, index) => (
                        <tr key={index}>
                            <td className="text-center">{user.firstname}</td>
                            <td className="text-center">{user.lastname}</td>
                            <td className="text-center">{user.username}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="text-center" colSpan={3}>
                            No users found for this event.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default UserOverviewTable;