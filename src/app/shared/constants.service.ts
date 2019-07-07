import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {
    public ARTICLES_API = 'https://newsapi.org/v2/top-headlines';
    public POSTS_V1_API = 'http://localhost:8080/api/v1/posts';
    public MESSAGES_V1_API = 'http://localhost:8080/api/v1/messages';
}
