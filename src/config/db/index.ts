import { createConnection } from 'typeorm';

export const connectionToServeDatabase = async () => {
    const connections = await createConnection();

    process.on('SIGINT', () => {
        connections.close().then(() => console.log('Connection to database is closed'));
    });
};