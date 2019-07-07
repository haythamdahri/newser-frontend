import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NewsService} from '../shared/news.service';
import {Post} from '../models/post.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.page.html',
    styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

    posts: Array<Post> = new Array<Post>();
    loading = true;
    status: string;

    constructor(private title: Title, private newsService: NewsService) {
    }

    ngOnInit() {
        this.title.setTitle('Posts');
        this.newsService.getPosts().subscribe((data: object) => {
                this.status = 'ok';
                this.posts = data['posts'];
            },
            (error: HttpErrorResponse) => {
                this.posts = null;
                this.status = 'bad';
                this.loading = false;
            },
            () => {
                this.loading = false;
            });
    }

}
