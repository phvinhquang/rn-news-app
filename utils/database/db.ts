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

export const BookmarkDB = new Vasern({
  schemas: [BookmarkSchema],
});
