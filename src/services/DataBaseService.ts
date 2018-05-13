import {MongoClient, ObjectID} from 'mongodb';
import * as mongoose from 'mongoose';
import {config} from '../config';

const dbUri = process.env.MONGODB_ADDON_URI || config.db.uri;
const dbName = process.env.MONGODB_ADDON_DB || config.db.name;


const userSchema = mongoose.Schema({
    name: String,
    interest: String
});
mongoose.model('User', userSchema);
const User = mongoose.model('User');


const messageSchema = mongoose.Schema({
    author: String,
    text: String
});
mongoose.model('Message', messageSchema);
const Message = mongoose.model('Message');


export class DataBaseService {

    public static connect() {
        mongoose.connect(config.db.uri)
            .then(() => {
                console.log('Mongoose connection succeed');
            }, err => { 
                console.log('Mongoose connection failed');
            } 
        );
    }
 
    public static addUser(user) {
        const newUser = new User(user);
        newUser.save((err) => {
            if (err) throw err;
            console.log('User successfully saved.');
        });
    }

    public static getUser(name) {
        return User.find({name})
    }

    public static getUsers() {
        return User.find({})
    }

    public static addMessage(message) {
        console.log(message);
        const newMessage = new Message(message);
        newMessage.save((err) => {
            if (err) throw err;
            console.log('Message successfully saved.');
        });
    }

    public static getMessages() {
        return Message.find({})
    }
    
}
