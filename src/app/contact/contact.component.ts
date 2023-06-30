import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent {

  @ViewChild('myForm') myForm: any;
  @ViewChild('nameField') nameField: any;
  @ViewChild('emailField') emailField: any;
  @ViewChild('messageField') messageField: any;
  @ViewChild('labelName') labelName: any;
  @ViewChild('labelEmail') labelEmail: any;
  @ViewChild('labelMessage') labelMessage: any;
  @ViewChild('sendButton') sendButton: any;
  @ViewChild('sentMessage') sentMessage: any;

  constructor() { }

  ngOnInit(): void { }

  /**
   * function to send the form data to the backend
   */
  async sendMail() {
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    if (!emailField.value.includes('.')) {
      this.validateEmail(emailField)
    } else {
      this.lockForm()
      this.myForm.nativeElement.style.transform = 'scale(0)';
      await this.fetchForm(nameField, emailField, messageField);
      this.sentMessage.nativeElement.style.transform = 'scale(1)';
      this.resetForm(nameField, emailField, messageField)
      await this.animateFormAndSentMessage()
      this.unlockForm();
    }
  }

  /**
   * function to animate the form and the sent message
   */
  async animateFormAndSentMessage() {
    setTimeout(() => {
      this.myForm.nativeElement.style.transform = 'scale(1)';
    }, 1500);
    setTimeout(() => {
      this.sentMessage.nativeElement.style.transform = 'translateY(-250px)';
    }, 1300);
    setTimeout(() => {
      this.sentMessage.nativeElement.style.transform = 'scale(0.001)';
      setTimeout(() => {
        this.sentMessage.nativeElement.style.transform = 'scale(0)';
      }, 200);
    }, 3000);
  }

  /**
   * function to validate the email field
   *
   * @param emailField the email field to validate
   *
   */
  validateEmail(emailField: any) {
    emailField.checkValidity()
    emailField.setCustomValidity('Please enter a valid email address');
    emailField.reportValidity();
    return
  }

  /**
   * function to lock the form
   */
  lockForm() {
    this.nameField.nativeElement.disabled = true;
    this.emailField.nativeElement.disabled = true;
    this.messageField.nativeElement.disabled = true;
    this.sendButton.nativeElement.disabled = true;
  }

  /**
   * function to fetch the form data
   *
   * @param nameField the name field
   * @param emailField the email field
   * @param messageField the message field
   */
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

  /**
   * function to reset the form
   *
   * @param nameField the name field
   * @param emailField the email field
   * @param messageField the message field
   */
  resetForm(nameField: any, emailField: any, messageField: any) {
    [nameField, emailField, messageField].forEach(field => {
      field.value = '';
      field.classList.remove('valid-border', 'invalid-border');
    });

    [this.labelName.nativeElement, this.labelEmail.nativeElement, this.labelMessage.nativeElement]
      .forEach(label => label.classList.remove('valid', 'invalid'));
  }

  /**
   * function to unlock the form
   *
   */
  unlockForm() {
    this.nameField.nativeElement.disabled = false;
    this.emailField.nativeElement.disabled = false;
    this.messageField.nativeElement.disabled = false;
    this.sendButton.nativeElement.disabled = false;
  }

  /**
   * function to check and toggle the field validation icon
   *
   * @param field the inputfield
   * @param label the ValidationIcon label
   */
  checkFieldValidationIcon(field: any, label: any) {
    const isEmail = field.name === 'email';
    const hasDot = field.value.includes('.');

    if (isEmail && hasDot && field.checkValidity()) {
      this.styleValidFormField(field, label)
    } else if (isEmail && !hasDot) {
      this.styleInvalidFormField(field, label)
    } else {
      this.toggleStyleFormField(field, label)
    }
  }

  /**
   * function to style the form field as valid
   *
   * @param field the inputfield
   * @param label the ValidationIcon label
   */
  styleValidFormField(field: any, label: any) {
    field.classList.add('valid-border');
    field.classList.remove('invalid-border');
    label.classList.add('valid');
    label.classList.remove('invalid');
  }

  /**
   * function to style the form field as invalid
   *
   * @param field the inputfield
   * @param label the ValidationIcon label
   */
  styleInvalidFormField(field: any, label: any) {
    label.classList.add('invalid');
    label.classList.remove('valid');
    field.classList.toggle('valid-border');
    field.classList.toggle('invalid-border');
  }

  /**
   * function to toggle the form field style
   *
   * @param field the inputfield
   * @param label the ValidationIcon label
   */
  toggleStyleFormField(field: any, label: any) {
    label.classList.toggle('valid', field.checkValidity());
    label.classList.toggle('invalid', !field.checkValidity());
    field.classList.toggle('valid-border', field.checkValidity());
    field.classList.toggle('invalid-border', !field.checkValidity());
  }
}


