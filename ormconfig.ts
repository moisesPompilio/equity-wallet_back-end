module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": +process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": [
        "src/entities/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "synchronize": process.env.DB_SYNC == "true"
}