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

export interface CategoryInterface {
  name: string;
  chosen: boolean;
  url: string;
}

export const VE_CATEGORIES: CategoryInterface[] = [
  {
    name: 'home',
    chosen: true,
    url: 'tin-moi-nhat.rss',
  },
  {
    name: 'world',
    chosen: true,
    url: 'the-gioi.rss',
  },
  {
    name: 'news',
    chosen: true,
    url: 'thoi-su.rss',
  },
  {
    name: 'business',
    chosen: true,
    url: 'kinh-doanh.rss',
  },
  {
    name: 'startup',
    chosen: true,
    url: 'startup.rss',
  },
  {
    name: 'entertainment',
    chosen: true,
    url: 'giai-tri.rss',
  },
  {
    name: 'sport',
    chosen: true,
    url: 'the-thao.rss',
  },
  {
    name: 'legal',
    chosen: true,
    url: 'phap-luat.rss',
  },
  {
    name: 'education',
    chosen: true,
    url: 'giao-duc.rss',
  },
  {
    name: 'newest',
    chosen: true,
    url: 'tin-moi-nhat.rss',
  },
  {
    name: 'top',
    chosen: true,
    url: 'tin-noi-bat.rss',
  },
  {
    name: 'health',
    chosen: true,
    url: 'suc-khoe.rss',
  },
  {
    name: 'life',
    chosen: true,
    url: 'gia-dinh.rss',
  },
  {
    name: 'travel',
    chosen: true,
    url: 'du-lich.rss',
  },
  {
    name: 'science',
    chosen: true,
    url: 'khoa-hoc.rss',
  },
  {
    name: 'technology',
    chosen: true,
    url: 'so-hoa.rss',
  },
  {
    name: 'vehicles',
    chosen: true,
    url: 'oto-xe-may.rss',
  },
  {
    name: 'perspectives',
    chosen: true,
    url: 'y-kien.rss',
  },
  {
    name: 'confide',
    chosen: true,
    url: 'tam-su.rss',
  },
  {
    name: 'funny',
    chosen: true,
    url: 'cuoi.rss',
  },
  {
    name: 'mostViewed',
    chosen: true,
    url: 'tin-xem-nhieu.rss',
  },
];

export const TT_CATEGORIES: CategoryInterface[] = [
  {
    name: 'home',
    chosen: true,
    url: 'tin-moi-nhat.rss',
  },
  {
    name: 'world',
    chosen: true,
    url: 'the-gioi.rss',
  },
  {
    name: 'business',
    chosen: true,
    url: 'kinh-doanh.rss',
  },
  {
    name: 'vehicles',
    chosen: true,
    url: 'xe.rss',
  },
  {
    name: 'culture',
    chosen: true,
    url: 'van-hoa.rss',
  },
  {
    name: 'sport',
    chosen: true,
    url: 'the-thao.rss',
  },
  {
    name: 'science',
    chosen: true,
    url: 'khoa-hoc.rss',
  },
  {
    name: 'fakeOrNot',
    chosen: true,
    url: 'gia-that.rss',
  },
  {
    name: 'viewerNews',
    chosen: true,
    url: 'ban-doc-lam-bao.rss',
  },
  {
    name: 'news',
    chosen: true,
    url: 'thoi-su.rss',
  },
  {
    name: 'legal',
    chosen: true,
    url: 'phap-luat.rss',
  },
  {
    name: 'technology',
    chosen: true,
    url: 'nhip-song-so.rss',
  },
  {
    name: 'youngLife',
    chosen: true,
    url: 'nhip-song-tre.rss',
  },
  {
    name: 'entertainment',
    chosen: true,
    url: 'giai-tri.rss',
  },
  {
    name: 'education',
    chosen: true,
    url: 'giao-duc.rss',
  },
  {
    name: 'health',
    chosen: true,
    url: 'suc-khoe.rss',
  },
  {
    name: 'relax',
    chosen: true,
    url: 'thu-gian.rss',
  },
  {
    name: 'travel',
    chosen: true,
    url: 'du-lich.rss',
  },
];
