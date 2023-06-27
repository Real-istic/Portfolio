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
      await this.fetchForm(nameField, emailField, messageField)
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

    await fetch('https://patriziomarzullo.de/send_mail.php', {
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

checkFieldValidationIcon(field: any, label: any) {
    const isEmail = field.name === 'email';
    const hasDot = field.value.includes('.');

    if (isEmail && hasDot && field.checkValidity()) {
      label.classList.add('valid');
      label.classList.remove('invalid');
    } else if (isEmail && !hasDot) {
      label.classList.add('invalid');
      label.classList.remove('valid');
    } else {
      label.classList.toggle('valid', field.checkValidity());
      label.classList.toggle('invalid', !field.checkValidity());
    }
  }

}


