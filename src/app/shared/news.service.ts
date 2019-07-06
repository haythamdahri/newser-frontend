import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Article} from '../models/article.model';
import {throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(private http: HttpClient) {
    }

    getArticles() {
        return this.http.get('https://newsapi.org/v2/top-headlines', {params: new HttpParams().append('country', 'us').append('apiKey', environment.newsApiKey)}).pipe(
            map((data: Array<Article>) => {
                    console.log(data);
                    return {status: data['status'], totalResults: data['totalResults'], articles: data['articles']};
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

}
