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
  @ViewChild('labelName') labelName: any;
  @ViewChild('labelEmail') labelEmail: any;
  @ViewChild('labelMessage') labelMessage: any;



  constructor() { }

  ngOnInit(): void { }

  async sendMail() {
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    if (!emailField.value.includes('.')) {
      this.validateEmail(emailField)
    } else {
      this.lockForm()
      // animation
      this.fetchForm(nameField, emailField, messageField)
      // show message: Message sent
      this.unlockForm()
    }
  }

  validateEmail(emailField: any) {
    emailField.checkValidity()
    emailField.setCustomValidity('Please enter a valid email address');
    emailField.reportValidity();
    return
  }

  lockForm() {
    this.nameField.nativeElement.disabled = true;
    this.emailField.nativeElement.disabled = true;
    this.messageField.nativeElement.disabled = true;
    this.sendButton.nativeElement.disabled = true;
  }

  async fetchForm(nameField: any, emailField: any, messageField: any) {
    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('email', emailField.value);
    fd.append('message', messageField.value);

    await fetch('https://patrizio-marzullo.developerakademie.net/portfolio/send_mail.php', {
      method: 'POST',
      body: fd
    });
  }

  unlockForm() {
    this.nameField.nativeElement.disabled = false;
    this.emailField.nativeElement.disabled = false;
    this.messageField.nativeElement.disabled = false;
    this.sendButton.nativeElement.disabled = false;
  }

  checkNameValidationIcon() {
    let labelName = this.labelName.nativeElement;
    if (this.nameField.nativeElement.checkValidity()) {
      labelName.classList.add('valid')
      labelName.classList.remove('invalid')

    } else if (!this.nameField.nativeElement.checkValidity()) {
      labelName.classList.add('invalid')
      labelName.classList.remove('valid')
    }
  }

  checkEmailValidationIcon() {
    let labelEmail = this.labelEmail.nativeElement;
    let emailField = this.emailField.nativeElement;
    if (emailField.checkValidity() && emailField.value.includes('.')) {
      labelEmail.classList.add('valid')
      labelEmail.classList.remove('invalid')

    } else if (!emailField.checkValidity() || !emailField.value.includes('.')) {
      labelEmail.classList.add('invalid')
      labelEmail.classList.remove('valid')
    }
  }

  checkMessageValidationIcon() {
    let labelMessage = this.labelMessage.nativeElement;
    if (this.messageField.nativeElement.checkValidity()) {
      labelMessage.classList.add('valid')
      labelMessage.classList.remove('invalid')

    } else if (!this.messageField.nativeElement.checkValidity()) {
      labelMessage.classList.add('invalid')
      labelMessage.classList.remove('valid')
    }
  }


}


