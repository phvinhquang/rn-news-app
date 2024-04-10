export interface Catergory {
  name: string;
  chosen: boolean;
  vneUrl: string;
  tuoiTreUrl: string;
}

export const CATEGORIES: Catergory[] = [
  {
    name: 'forYou',
    chosen: true,
    vneUrl: 'tin-noi-bat.rss',
    tuoiTreUrl: 'thoi-su.rss',
  },
  {
    name: 'top',
    chosen: true,
    vneUrl: 'tin-noi-bat.rss',
    tuoiTreUrl: 'tin-moi-nhat.rss',
  },
  {
    name: 'world',
    chosen: true,
    vneUrl: 'the-gioi.rss',
    tuoiTreUrl: 'the-gioi.rss',
  },
  {
    name: 'politics',
    chosen: true,
    vneUrl: 'phap-luat.rss',
    tuoiTreUrl: 'phap-luat.rss',
  },
  {
    name: 'entertainment',
    chosen: true,
    vneUrl: 'giai-tri.rss',
    tuoiTreUrl: 'giai-tri.rss',
  },
  {
    name: 'science',
    chosen: true,
    vneUrl: 'khoa-hoc.rss',
    tuoiTreUrl: 'khoa-hoc.rss',
  },
  {
    name: 'business',
    chosen: true,
    vneUrl: 'kinh-doanh.rss',
    tuoiTreUrl: 'kinh-doanh.rss',
  },
  {
    name: 'technology',
    chosen: true,
    vneUrl: 'so-hoa.rss',
    tuoiTreUrl: 'nhip-song-tre.rss',
  },
];
