import { createConnection } from 'typeorm';

export const connectionToServeDatabase = async () => {
    const connections = await createConnection();
    console.log(`App connection the database ${connections.options.database}`);

    process.on('SIGINT', () => {
        connections.close().then(() => console.log('Connection to database is closed'));
    });
};