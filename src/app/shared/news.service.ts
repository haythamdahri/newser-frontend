import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Article} from '../models/article.model';
import {throwError} from 'rxjs';
import {ConstantsService} from './constants.service';
import {Message} from '../models/message.model';
import {Post} from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(private http: HttpClient, private constantsService: ConstantsService) {
    }

    getArticles() {
        return this.http.get(this.constantsService.ARTICLES_API, {params: new HttpParams().append('country', 'us').append('apiKey', environment.newsApiKey)}).pipe(
            map((data: Array<Article>) => {
                    console.log(data);
                    return {status: data['status'], totalResults: data['totalResults'], articles: data['articles']};
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

    getPosts() {
        return this.http.get(this.constantsService.MESSAGES_V1_API).pipe(
            map((response: HttpResponse<Array<Post>>) => {
                    console.log(response);
                    return {posts: response};
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

    sendMessage(message: Message) {
        return this.http.post(this.constantsService.MESSAGES_V1_API, {message: message}).pipe(
            map((response: HttpResponse<Message>) => {
                    console.log(response);
                    return true;
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

}
