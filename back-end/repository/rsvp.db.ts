import { RSVP } from '../model/rsvp';
import { RsvpStatus } from '../types';
import database from './database';

const createRsvp = async (rsvp: RSVP): Promise<RSVP> => {
    try {
        const rsvpPrisma = await database.rSVP.create({
            data: {
                event: {
                    connect: {
                        id: rsvp.getEvent().getId(),
                    }
                },
                user: {
                    connect: {
                        id: rsvp.getUser().getId(),
                    }
                },
                status: rsvp.getStatus(),
            },
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return RSVP.from(rsvpPrisma);
    } catch(error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllRsvp = async (): Promise<RSVP[]> => {
    try {
        const rsvpsPrisma = await database.rSVP.findMany({
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return rsvpsPrisma.map((rsvpsPrisma) => RSVP.from(rsvpsPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getRsvpByEventAndUser = async ({
    eventId,
    userId,
}: {
    eventId: number,
    userId: number,
}): Promise<RSVP | null> => {
    try {
        const rsvpPrisma = await database.rSVP.findFirst({
            where: {
                eventId,
                userId
            },
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        });
        return rsvpPrisma ? RSVP.from(rsvpPrisma) : null;
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllRsvpsFromUserByUserId = async ({userId}: {userId: number}): Promise<RSVP[]> => {
    try {
        const rsvpsPrisma = await database.rSVP.findMany({
            where: {
                userId
            },
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return rsvpsPrisma.map((rsvpsPrisma) => RSVP.from(rsvpsPrisma));
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllRsvpsFromEventByEventId = async ({eventId}: {eventId: number}): Promise<RSVP[]> => {
    try {
        const rsvpsPrisma = await database.rSVP.findMany({
            where: {
                eventId
            },
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return  rsvpsPrisma.map((rsvpsPrisma) => RSVP.from(rsvpsPrisma));
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getRsvpById = async ({id}: {id: number}): Promise<RSVP | null> => {
    try {
        const rsvpPrisma = await database.rSVP.findUnique({
            where: {id},
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return rsvpPrisma ? RSVP.from(rsvpPrisma) : null;
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const updateStatusFromRsvp = async ({rsvp, status}:{rsvp: RSVP, status: RsvpStatus}): Promise<RSVP> => {
    try {
        const rsvpPrisma = await database.rSVP.update({
            where: {id: rsvp.getId()},
            data: {
                status: status
            },
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return RSVP.from(rsvpPrisma);
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const removeRsvpById = async ({id}: {id: number}): Promise<RSVP | null> => {
    try {
        const rsvpPrisma = await database.rSVP.delete({
            where: {id},
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return rsvpPrisma ? RSVP.from(rsvpPrisma) : null;
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllRsvpWithAttendingStatusByEventId = async ({id}:{id: number}):Promise<RSVP[]> => {
    try {
        const rsvpsPrisma = await database.rSVP.findMany({
            where: {
                eventId: id,
                status: "attending"
            },
            include: {
                event: {
                    include: {
                        user: true,
                        venue: true,
                    }
                },
                user: true,
            }
        })
        return rsvpsPrisma.map((rsvpsPrisma) => RSVP.from(rsvpsPrisma));
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const removeAllRsvpByUserId = async ({id}: {id: number}): Promise<number> => {
    try {
        const rsvpsPrisma = await database.rSVP.deleteMany({
            where: {
                userId: id
            },
        })
        return rsvpsPrisma.count;
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const removeAllRsvpByEventId = async ({id}: {id: number}): Promise<number> => {
    try {
        const rsvpsPrisma = await database.rSVP.deleteMany({
            where: {
                eventId: id
            },
        })
        return rsvpsPrisma.count;
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    createRsvp,
    getAllRsvp,
    getRsvpByEventAndUser,
    getAllRsvpsFromUserByUserId,
    getAllRsvpsFromEventByEventId,
    getRsvpById,
    getAllRsvpWithAttendingStatusByEventId,
    updateStatusFromRsvp,
    removeRsvpById,
    removeAllRsvpByUserId,
    removeAllRsvpByEventId
}