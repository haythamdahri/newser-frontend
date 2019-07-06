import {Component, OnInit} from '@angular/core';
import {NewsService} from '../shared/news.service';
import {Article} from '../models/article.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    articles: Array<Article> = new Array();
    totalElements: number;
    private status: string;

    constructor(private newsService: NewsService, private router: Router,
                public toastController: ToastController) {
    }

    ngOnInit(): void {
        this.newsService.getArticles().subscribe((data: object) => {
                this.status = data['status'];
                this.totalElements = data['totalElements'];
                this.articles = data['articles'];
            },
            (error: HttpErrorResponse) => {
                this.articles = null;
                this.totalElements = 0;
                this.status = 'bad';
            });
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Your settings have been saved.',
            duration: 2000
        });
        toast.present();
    }

    async presentToastWithOptions() {
        const toast = await this.toastController.create({
            header: 'Toast header',
            message: 'Click to Close',
            position: 'top',
            buttons: [
                {
                    side: 'start',
                    icon: 'star',
                    text: 'Favorite',
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                }, {
                    text: 'Done',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }

}
