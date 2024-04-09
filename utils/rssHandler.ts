import {vnexpressRssUrl, tuoiTreRssUrl} from '../constants/Rss_Url';
import {NewsSource} from '../screens/Home';

export const fetchAndParseRss = async (
  source: string,
  enpoint: string,
  category: string,
) => {
  const domain =
    source === NewsSource.VnExpress ? vnexpressRssUrl : tuoiTreRssUrl;

  try {
    const response = await fetch(domain + enpoint);
    const xmlText = await response.text();

    const items = xmlText.split('<item>');
    // Delete first item
    items.shift();

    const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/;

    let data;

    // Parse data from VnExpress
    if (domain === vnexpressRssUrl) {
      data = items.map(item => {
        // Extract title, description, image, date and actually link to article
        const title = item.match(/<title>(.*?)<\/title>/)![1];

        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)![1];

        const link = item.match(/<link>(.*?)<\/link>/)![1];

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
          author: 'VnExpress',
          category: category,
          pubDate: pubDate || 'none',
          thumbnail: imageUrl?.trim() || 'none',
          bookmarked: false,
        };
      });
    }
    // Parse data for Tuoi Tre
    else {
      data = items.map(item => {
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

        return {
          title: title || 'none',
          link: link,
          author: 'Tuoi Tre',
          category: category,
          pubDate: pubDate || 'none',
          thumbnail: imageUrl?.trim() || 'none',
          bookmarked: false,
        };
      });
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
