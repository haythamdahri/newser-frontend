import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Message} from '../models/message.model';
import {AlertController} from '@ionic/angular';
import {NewsService} from '../shared/news.service';


declare var $: any;

@Component({
    selector: 'app-list',
    templateUrl: 'contact.page.html',
    styleUrls: ['contact.page.css']
})
export class ContactPage implements OnInit {

    @ViewChild('sendMessageForm') form: NgForm;
    message = new Message();

    submitted = false;
    errorSubmission = false;
    sending = false;

    constructor(private alertController: AlertController, private newsService: NewsService) {
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

    ngOnInit() {
    }

    sendMessage() {
        if (!this.form.valid) {
            this.presentAlert();
            console.log(this.form.errors);
        } else {
            console.log(this.message);
            this.sending = true;
            $('#submit-btn').attr('disabled', true);
            this.newsService.sendMessage(this.message).subscribe(
                (response: any) => {
                    this.sending = false;
                    this.submitted = true;
                },
                (error: Error) => {
                    $('#submit-btn').attr('disabled', false);
                    this.sending = false;
                    this.errorSubmission = true;
                }
            );
        }
    }
}
