// import {vnexpressRssUrl, tuoiTreRssUrl} from '../constants/Rss_Url';
import {NewsSource} from '../screens/Home';
import {Bookmarks} from './database';

export const fetchAndParseRss = async (
  source: string,
  enpoint: string,
  category: string,
  userEmail: string,
) => {
  // const domain =
  //   source === NewsSource.VnExpress ? vnexpressRssUrl : tuoiTreRssUrl;

  try {
    // console.log('rss', source);
    // console.log('rss', enpoint);

    const response = await fetch(enpoint);
    const xmlText = await response.text();
    // console.log(xmlText);

    const items = xmlText.split('<item>');
    // Delete first item
    items.shift();
    // console.log(items);

    const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/;

    let data;

    // Parse data from VnExpress
    if (source === NewsSource.VnExpress) {
      data = await Promise.all(
        items.map(async item => {
          // Extract title, description, image, date and actually link to article
          const title = item.match(/<title>(.*?)<\/title>/)![1];
          // console.log(title);

          const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)![1];

          const link = item.match(/<link>(.*?)<\/link>/)![1];

          const descriptionData = item.match(
            /<description>(.*?)<\/description>/,
          )?.[1];

          // const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/;
          const urlRegex = /src="(.*?)"/;
          const description = descriptionData?.match(urlRegex);
          let imageUrl;

          if (description) {
            imageUrl = description[1];
          }

          // console.log(imageUrl);
          const isBookmarked = await Bookmarks.get({
            link: link,
            userEmail: userEmail,
          });
          // if (isBookmarked) {
          //   console.log(link);
          // }

          return {
            title: title || 'none',
            link: link,
            author: 'VnExpress',
            category: category,
            pubDate: pubDate || 'none',
            thumbnail: imageUrl?.trim() || 'none',
            bookmarked: isBookmarked ? true : false,
          };
        }),
      );
    }
    // Parse data for Tuoi Tre
    else {
      data = await Promise.all(
        items.map(async item => {
          // Extract title, description, image, date and actually link to article
          const titleData = item.match(/<title>(.*?)<\/title>/)![1];
          const title = titleData.match(cdataRegex)![1];

          const pubDateData = item.match(/<pubDate>(.*?)<\/pubDate>/)![1];
          const pubDate = pubDateData
            .match(cdataRegex)![1]
            .replace('GMT+7', '+0700');
          // console.log(pubDate);

          const linkData = item.match(/<link>(.*?)<\/link>/)![1];
          const link = linkData.match(cdataRegex)![1];

          const descriptionData = item.match(
            /<description>(.*?)<\/description>/,
          )![1];
          // const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/;
          const urlRegex = /src="(.*?)"/;
          const description = descriptionData.match(urlRegex);
          let imageUrl;

          if (description) {
            imageUrl = description[1];
          }

          const isBookmarked = await Bookmarks.get({link: link});
          // if (isBookmarked) {
          //   console.log('checking bookmark');

          //   console.log(link);
          // }

          return {
            title: title || 'none',
            link: link,
            author: 'Tuoi Tre',
            category: category,
            pubDate: pubDate || 'none',
            thumbnail: imageUrl?.trim() || 'none',
            bookmarked: isBookmarked ? true : false,
          };
        }),
      );
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
