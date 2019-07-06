import {Source} from './source.model';

export class Article {
    author: string;
    content: string;
    description: string;
    publishedAt: Date;
    source: Source;
    title: string;
    url: URL;
    urlToImage: URL;
}
