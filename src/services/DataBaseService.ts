import {MongoClient, ObjectID} from 'mongodb';
import {config} from '../config';

const dbUri = process.env.MONGODB_ADDON_URI || config.db.uri;
const dbName = process.env.MONGODB_ADDON_DB || config.db.name;

export class DataBaseService {

    
    
}
