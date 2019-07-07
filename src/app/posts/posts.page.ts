import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.page.html',
    styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

    constructor(private title: Title) {
    }

    ngOnInit() {
        this.title.setTitle('Posts');
    }

}
