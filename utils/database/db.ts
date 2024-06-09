//News Schema
// {
//   title: title || 'none',
//   link: link,
//   author: 'Tuoi Tre',
//   category: category,
//   pubDate: pubDate || 'none',
//   thumbnail: imageUrl?.trim() || 'none',
//   // bookmarked: boolean
// }

import Vasern from 'vasern';

const BookmarkSchema = {
  name: 'Bookmarks',
  props: {
    title: 'string',
    link: 'string',
    author: 'string',
    category: 'string',
    pubDate: 'string',
    thumbnail: 'string',
    userEmail: 'string',
  },
};

const SeenSchema = {
  name: 'Seens',
  props: {
    title: 'string',
    link: 'string',
    author: 'string',
    category: 'string',
    pubDate: 'string',
    thumbnail: 'string',
    userEmail: 'string',
    viewedAt: 'number',
    bookmarked: 'boolean',
  },
};

const NewsSchema = {
  name: 'News',
  props: {
    title: 'string',
    link: 'string',
    author: 'string',
    category: 'string',
    pubDate: 'string',
    thumbnail: 'string',
    userEmail: 'string',
    viewedAt: 'number',
    bookmarked: 'boolean',
  },
};

const userSchema = {
  name: 'Users',
  props: {
    email: 'string',
    newsSource: 'string',
    categories: 'string',
    language: 'string',
    theme: 'string',
  },
};

export const BookmarkDB = new Vasern({
  schemas: [BookmarkSchema],
});

export const SeenDB = new Vasern({
  schemas: [SeenSchema],
});

export const UsersDB = new Vasern({
  schemas: [userSchema],
});

export const NewsDB = new Vasern({
  schemas: [NewsSchema],
});
