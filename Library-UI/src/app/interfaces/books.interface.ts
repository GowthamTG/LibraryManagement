export interface Book {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  published: boolean;
  publishedDate: Date;

  ifsc: string;
  description: string;

  price: number;

  categories: string[];
}
