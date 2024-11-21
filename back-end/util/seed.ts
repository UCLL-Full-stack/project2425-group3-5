import { PrismaClient } from '@prisma/client';
import { User } from '../model/user';
import { Event } from '../model/event';
import { Venue } from '../model/venue';

const prisma = new PrismaClient();

async function seed() {
    try {
        // Clear existing data
        await prisma.user.deleteMany();
        await prisma.event.deleteMany();
        await prisma.venue.deleteMany();

        // Seed users
        const sampleUsers = [
            {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'admin',
            },
            {
                firstname: 'Jane',
                lastname: 'Smith',
                email: 'jane.smith@example.com',
                password: 'securepass',
                role: 'user',
            },
        ];

        const userInstances = [];
        for (const userData of sampleUsers) {
            const createdUser = await prisma.user.create({
                data: userData,
            });
            userInstances.push(User.from(createdUser));
        }

        // Seed venues
        const sampleVenues = [
            {
                name: 'Main Hall',
                address: '123 Main St, Anytown',
                capacity: 100,
            },
            {
                name: 'Conference Room A',
                address: '456 Elm St, Sometown',
                capacity: 50,
            },
        ];

        const venueInstances = [];
        for (const venueData of sampleVenues) {
            const createdVenue = await prisma.venue.create({
                data: venueData,
            });
            venueInstances.push(Venue.from(createdVenue));
        }

        // Seed events
        const sampleEvents = [
            {
                title: 'Annual Conference',
                start_date: new Date('2024-01-15'),
                end_date: new Date('2024-01-17'),
                users: userInstances,
                venues: venueInstances,
            },
        ];

        for (const eventData of sampleEvents) {
            await prisma.event.create({
                data: {
                    title: eventData.title,
                    start_date: eventData.start_date,
                    end_date: eventData.end_date,
                    user: {
                        connect: eventData.users.map((user) => ({ id: user.getId() })),
                    },
                    venue: {
                        connect: eventData.venues.map((venue) => ({ id: venue.getId() })),
                    },
                },
            });
        }

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
