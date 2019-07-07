import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
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
            map((data: any) => {
                    return {status: data['status'], totalResults: data['totalResults'], articles: data['articles']};
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

    getPost(id: number) {
        return this.http.get(this.constantsService.POSTS_V1_API + "/" + id).pipe(
            map((data: Post) => {
                    return {post: data};
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

    getPosts() {
        return this.http.get(this.constantsService.POSTS_V1_API).pipe(
            map((data: Array<Post>) => {
                    return {posts: data};
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

    sendMessage(message: Message) {
        console.log(message);
        return this.http.post(this.constantsService.MESSAGES_V1_API, message).pipe(
            map((response: HttpResponse<Message>) => {
                    return true;
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }

    uploadPostImage(formData: FormData) {
        return this.http.post(this.constantsService.POSTS_IMAGES_UPLOAD_V1_API, formData, {
            observe: "events",
            reportProgress: true
        }).pipe(
            map((event) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return {status: 'progress', message: progress};

                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return `Unhandled event: ${event.type}`;
                }
            }),
            catchError(error => {
                return throwError(error);
            }));
    }

    savePost(post: Post) {
        return this.http.post(this.constantsService.MESSAGES_V1_API, post).pipe(
            map((response: HttpResponse<Post>) => {
                    return true;
                },
                catchError(error => {
                    return throwError(error);
                }))
        );
    }


}
