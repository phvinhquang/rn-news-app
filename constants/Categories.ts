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
    url: 'https://vnexpress.net/rss/tin-moi-nhat.rss',
  },
  {
    name: 'world',
    chosen: true,
    url: 'https://vnexpress.net/rss/the-gioi.rss',
  },
  {
    name: 'news',
    chosen: true,
    url: 'https://vnexpress.net/rss/thoi-su.rss',
  },
  {
    name: 'business',
    chosen: true,
    url: 'https://vnexpress.net/rss/kinh-doanh.rss',
  },
  {
    name: 'startup',
    chosen: true,
    url: 'https://vnexpress.net/rss/startup.rss',
  },
  {
    name: 'entertainment',
    chosen: true,
    url: 'https://vnexpress.net/rss/giai-tri.rss',
  },
  {
    name: 'sport',
    chosen: true,
    url: 'https://vnexpress.net/rss/the-thao.rss',
  },
  {
    name: 'legal',
    chosen: true,
    url: 'https://vnexpress.net/rss/phap-luat.rss',
  },
  {
    name: 'education',
    chosen: true,
    url: 'https://vnexpress.net/rss/giao-duc.rss',
  },
  {
    name: 'newest',
    chosen: true,
    url: 'https://vnexpress.net/rss/tin-moi-nhat.rss',
  },
  {
    name: 'top',
    chosen: true,
    url: 'https://vnexpress.net/rss/tin-noi-bat.rss',
  },
  {
    name: 'health',
    chosen: true,
    url: 'https://vnexpress.net/rss/suc-khoe.rss',
  },
  {
    name: 'life',
    chosen: true,
    url: 'https://vnexpress.net/rss/gia-dinh.rss',
  },
  {
    name: 'travel',
    chosen: true,
    url: 'https://vnexpress.net/rss/du-lich.rss',
  },
  {
    name: 'science',
    chosen: true,
    url: 'https://vnexpress.net/rss/khoa-hoc.rss',
  },
  {
    name: 'technology',
    chosen: true,
    url: 'https://vnexpress.net/rss/so-hoa.rss',
  },
  {
    name: 'vehicles',
    chosen: true,
    url: 'https://vnexpress.net/rss/oto-xe-may.rss',
  },
  {
    name: 'perspectives',
    chosen: true,
    url: 'https://vnexpress.net/rss/y-kien.rss',
  },
  {
    name: 'confide',
    chosen: true,
    url: 'https://vnexpress.net/rss/tam-su.rss',
  },
  {
    name: 'funny',
    chosen: true,
    url: 'https://vnexpress.net/rss/cuoi.rss',
  },
  {
    name: 'mostViewed',
    chosen: true,
    url: 'https://vnexpress.net/rss/tin-xem-nhieu.rss',
  },
];

export const TT_CATEGORIES: CategoryInterface[] = [
  {
    name: 'home',
    chosen: true,
    url: 'https://tuoitre.vn/rss/tin-moi-nhat.rss',
  },
  {
    name: 'world',
    chosen: true,
    url: 'https://tuoitre.vn/rss/the-gioi.rss',
  },
  {
    name: 'business',
    chosen: true,
    url: 'https://tuoitre.vn/rss/kinh-doanh.rss',
  },
  {
    name: 'vehicles',
    chosen: true,
    url: 'https://tuoitre.vn/rss/xe.rss',
  },
  {
    name: 'culture',
    chosen: true,
    url: 'https://tuoitre.vn/rss/van-hoa.rss',
  },
  {
    name: 'sport',
    chosen: true,
    url: 'https://tuoitre.vn/rss/the-thao.rss',
  },
  {
    name: 'science',
    chosen: true,
    url: 'https://tuoitre.vn/rss/khoa-hoc.rss',
  },
  {
    name: 'fakeOrNot',
    chosen: true,
    url: 'https://tuoitre.vn/rss/gia-that.rss',
  },
  {
    name: 'viewerNews',
    chosen: true,
    url: 'https://tuoitre.vn/rss/ban-doc-lam-bao.rss',
  },
  {
    name: 'news',
    chosen: true,
    url: 'https://tuoitre.vn/rss/thoi-su.rss',
  },
  {
    name: 'legal',
    chosen: true,
    url: 'https://tuoitre.vn/rss/phap-luat.rss',
  },
  {
    name: 'technology',
    chosen: true,
    url: 'https://tuoitre.vn/rss/nhip-song-so.rss',
  },
  {
    name: 'youngLife',
    chosen: true,
    url: 'https://tuoitre.vn/rss/nhip-song-tre.rss',
  },
  {
    name: 'entertainment',
    chosen: true,
    url: 'https://tuoitre.vn/rss/giai-tri.rss',
  },
  {
    name: 'education',
    chosen: true,
    url: 'https://tuoitre.vn/rss/giao-duc.rss',
  },
  {
    name: 'health',
    chosen: true,
    url: 'https://tuoitre.vn/rss/suc-khoe.rss',
  },
  {
    name: 'relax',
    chosen: true,
    url: 'https://tuoitre.vn/rss/thu-gian.rss',
  },
  {
    name: 'travel',
    chosen: true,
    url: 'https://tuoitre.vn/rss/du-lich.rss',
  },
];
