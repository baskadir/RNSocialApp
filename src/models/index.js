// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UsersLike, Post, User } = initSchema(schema);

export {
  UsersLike,
  Post,
  User
};