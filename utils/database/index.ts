import {BookmarkDB, NewsDB, SeenDB, UsersDB} from './db';

export const {Bookmarks} = BookmarkDB as any;
export const {Seens} = SeenDB as any;
export const {Users} = UsersDB as any;
export const {News} = NewsDB as any;
