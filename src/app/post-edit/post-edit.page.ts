import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from "../models/post.model";
import {ActivatedRoute, Params} from "@angular/router";
import {NewsService} from "../shared/news.service";
import {NgForm} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

declare var $: any;

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.page.html',
    styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {

    post: Post = new Post();
    @ViewChild('savePostForm') form: NgForm;

    submitted = false;
    errorSubmission = false;
    loading = false;

    progressPercent = 0;

    constructor(private route: ActivatedRoute, private newsService: NewsService,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params['id'] != null) {
                this.loading = true;
                $('#submit-btn').attr('disabled', true);
                this.newsService.getPost(params['id']).subscribe(
                    (data: object) => {
                        this.post = data['post'];
                        this.loading = false;
                        $('#submit-btn').attr('disabled', false);
                    },
                    () => {
                        this.post = new Post();
                        $('#submit-btn').attr('disabled', false);
                    }
                );
            }
        });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Invalid data',
            message: 'Please fill correct data before sending...',
            buttons: ['OK']
        });

        await alert.present();
    }

    savePost() {
        if (!this.form.valid) {
            this.presentAlert();
            console.log(this.form.errors);
        } else {
            this.loading = true;
            $('#submit-btn').attr('disabled', true);
            const formData = new FormData();
            console.log(this.form.controls['image'].value);
            formData.append('image', this.form.controls['image'].value);
            this.newsService.uploadPostImage(formData).subscribe((response: object) => {
                    if (response['progress'] != null) {
                        this.progressPercent = response['message'];
                        this.loading = false;
                        this.submitted = true;
                    }
                },
                (error: HttpErrorResponse) => {
                    console.log(error);
                    this.loading = false;
                    this.errorSubmission = true;
                    $('#submit-btn').attr('disabled', false);
                },
                () => {
                    this.newsService.savePost(this.post).subscribe(
                        (response: any) => {
                            this.loading = false;
                            this.submitted = true;
                        },
                        (error: Error) => {
                            $('#submit-btn').attr('disabled', false);
                            this.loading = false;
                            this.errorSubmission = true;
                            $('#submit-btn').attr('disabled', false);
                        }
                    );
                });
        }
    }
}
