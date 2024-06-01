import { set, connect, connection } from 'mongoose';

// We need to define the url
const DB_NAME = process.env.DATABASE_NAME;
const URL = `${process.env.CONNECTION_URL}${DB_NAME}`;

set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
set('useFindAndModify', false);

//Connection establishment
connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = connection;

//We enabled the Listener
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log(`DB Connection with ${DB_NAME} established successfully`);
});

export default db;