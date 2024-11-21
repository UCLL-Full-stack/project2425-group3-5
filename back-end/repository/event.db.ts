import { set } from 'date-fns';
import { Event } from '../model/event';
import { User } from '../model/user';
import { Venue } from '../model/venue';
import database from './database';

const getAllEvents = async (): Promise<Event[]> => {

}


export default {
    getAllEvents,
}