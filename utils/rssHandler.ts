import {vnexpressRssUrl} from '../constants/Rss_Url';

export const fetchAndParseRss = async () => {
  try {
    const response = await fetch(vnexpressRssUrl);
    const xmlText = await response.text();

    const items = xmlText.split('<item>');
    // Delete first item
    items.shift();
    // console.log(items);

    // Extract title, description, image, date and actually link to article
    // const title = items[1].match(/<title>(.*?)<\/title>/)![1];
    // console.log(title);

    // Not needed now :((
    // const descriptionData = items[2].match(
    //   /<description>(.*?)<\/description>/,
    // )![1];

    // const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/;
    // const urlRegex = /src="(.*?)"/;
    // const description = descriptionData.match(urlRegex);
    // if (description) {
    //   console.log(description[1]);
    // }

    // const pubDate = items[1].match(/<pubDate>(.*?)<\/pubDate>/)![1];
    // console.log(pubDate);

    // const image = items[1].match(/<enclosure (.*?)\/>/);
    // const urlRegex = /url="(.*?)"/;
    // const imageUrl = image![1].match(urlRegex)![1];

    // console.log(imageUrl);

    const data = items.map(item => {
      // Extract title, description, image, date and actually link to article
      const title = item.match(/<title>(.*?)<\/title>/)![1];

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)![1];

      const link = items[1].match(/<link>(.*?)<\/link>/)![1];

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

      return {
        title: title || 'none',
        link: link,
        category: 'For you',
        pubDate: pubDate || 'none',
        thumbnail: imageUrl?.trim() || 'none',
      };
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
