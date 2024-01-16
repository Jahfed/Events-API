import { PrismaClient } from '@prisma/client';
import eventData from "../src/data/events.json" assert {type: "json"};
import categoryData from "../src/data/categories.json" assert {type: "json"};
import userData from "../src/data/users.json" assert {type: "json"};


const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function main() {

    const { categories } = categoryData;
    const { users } = userData;

    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: category
        })
    }

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        })
    }

}

async function events() {
    const { events } = eventData;

    for (const event of events) {
        await prisma.event.upsert({
            where: { id: event.id },
            update: {},
            create: {
                user_id: event.user_id,
                title: event.title,
                description: event.description,
                image: event.image,
                categories_id: {
                    disconnect: event.events_id,
                    connect: event.events_id,
                },
                location: event.location,
                startTime: event.startTime,
                endTime: event.endTime
            }

        })
    }
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

events()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })