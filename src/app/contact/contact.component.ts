import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent {

  @ViewChild('myForm') myForm: any;
  @ViewChild('nameField') nameField: any;
  @ViewChild('messageField') messageField: any;
  @ViewChild('emailField') emailField: any;
  @ViewChild('sendButton') sendButton: any;



  constructor() { }

  ngOnInit(): void { }

  async sendMail() {
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    nameField.disabled = true;
    emailField.disabled = true;
    messageField.disabled = true;
    sendButton.disabled = true;

    // animation

    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('email', emailField.value);
    fd.append('message', messageField.value);

    //send the form data to the server
    await fetch('https://patrizio-marzullo.developerakademie.net/portfolio/send_mail.php', {
      method: 'POST',
      body: fd
    });

    // show message: Message sent

    nameField.disabled = false;
    emailField.disabled = false;
    messageField.disabled = false;
    sendButton.disabled = false;
  }
}
