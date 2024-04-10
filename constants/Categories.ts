export interface Catergory {
  name: string;
  vneUrl: string;
  tuoiTreUrl: string;
}

export const CATEGORIES: Catergory[] = [
  {name: 'forYou', vneUrl: 'tin-noi-bat.rss', tuoiTreUrl: 'tin-moi-nhat.rss'},
  {name: 'top', vneUrl: 'tin-noi-bat.rss', tuoiTreUrl: 'tin-moi-nhat.rss'},
  {name: 'world', vneUrl: 'the-gioi.rss', tuoiTreUrl: 'the-gioi.rss'},
  {name: 'politics', vneUrl: 'phap-luat.rss', tuoiTreUrl: 'phap-luat.rss'},
  {name: 'entertainment', vneUrl: 'giai-tri.rss', tuoiTreUrl: 'giai-tri.rss'},
  {name: 'science', vneUrl: 'khoa-hoc.rss', tuoiTreUrl: 'khoa-hoc.rss'},
  {name: 'business', vneUrl: 'kinh-doanh.rss', tuoiTreUrl: 'kinh-doanh.rss'},
  {name: 'technology', vneUrl: 'so-hoa.rss', tuoiTreUrl: 'nhip-song-tre.rss'},
];
