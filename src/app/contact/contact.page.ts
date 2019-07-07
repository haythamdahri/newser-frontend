import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Message} from '../models/message.model';

@Component({
  selector: 'app-list',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.css']
})
export class ContactPage implements OnInit {

  @ViewChild('sendMessageForm') form: NgForm;
  message = new Message();

  isSubmitted = false;
  isSending = false;

  constructor() {
  }

  ngOnInit() {
  }

  sendMessage() {

  }
}
