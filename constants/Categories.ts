export interface Catergory {
  name: string;
  vneUrl: string;
  tuoiTreUrl: string;
}

export const CATEGORIES: Catergory[] = [
  {name: 'For You', vneUrl: 'tin-noi-bat.rss', tuoiTreUrl: 'tin-moi-nhat.rss'},
  {name: 'Top', vneUrl: 'tin-noi-bat.rss', tuoiTreUrl: 'tin-moi-nhat.rss'},
  {name: 'World', vneUrl: 'the-gioi.rss', tuoiTreUrl: 'the-gioi.rss'},
  {name: 'Politics', vneUrl: 'phap-luat.rss', tuoiTreUrl: 'phap-luat.rss'},
  {name: 'Entertainment', vneUrl: 'giai-tri.rss', tuoiTreUrl: 'giai-tri.rss'},
  {name: 'Science', vneUrl: 'khoa-hoc.rss', tuoiTreUrl: 'khoa-hoc.rss'},
  {name: 'Business', vneUrl: 'kinh-doanh.rss', tuoiTreUrl: 'kinh-doanh.rss'},
  {name: 'Technology', vneUrl: 'so-hoa.rss', tuoiTreUrl: 'nhip-song-tre.rss'},
];
