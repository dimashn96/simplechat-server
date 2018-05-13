import {MongoClient, ObjectID} from 'mongodb';
import * as mongoose from 'mongoose';
import {config} from '../config';

const dbUri = process.env.MONGODB_ADDON_URI || config.db.uri;
const dbName = process.env.MONGODB_ADDON_DB || config.db.name;

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
    
}
