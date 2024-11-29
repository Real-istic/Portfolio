import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('labelName') labelName!: ElementRef;
  @ViewChild('labelEmail') labelEmail!: ElementRef;
  @ViewChild('labelMessage') labelMessage!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;
  @ViewChild('sentMessage') sentMessage!: ElementRef;

  /**
   * function to send the form data to the backend
   */
  protected async sendMail(): Promise<void> {
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    if (!emailField.value.includes('.') && emailField.checkValidity()) {
      this.validateEmail(emailField);
    } else if (emailField.value.includes('.') && emailField.checkValidity()) {
      this.lockForm();
      this.myForm.nativeElement.style.transform = 'scale(0)';
      await this.fetchForm(nameField, emailField, messageField);
      this.sentMessage.nativeElement.style.transform = 'scale(1)';
      this.resetForm(nameField, emailField, messageField);
      await this.animateFormAndSentMessage();
      this.unlockForm();
    }
  }

  /**
   * function to animate the form and send the message
   */
  async animateFormAndSentMessage(): Promise<void> {
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
  private validateEmail(emailField: HTMLInputElement): void {
    emailField.checkValidity();
  }

  /**
   * function to lock the form
   */
  private lockForm(): void {
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
  private async fetchForm(
    nameField: HTMLInputElement,
    emailField: HTMLInputElement,
    messageField: HTMLInputElement,
  ): Promise<void> {
    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('email', emailField.value);
    fd.append('message', messageField.value);

    await fetch('https://patriziomarzullo.de/send_mail.php', {
      method: 'POST',
      body: fd,
    });
  }

  /**
   * function to reset the form
   *
   * @param nameField the name field
   * @param emailField the email field
   * @param messageField the message field
   */
  private resetForm(
    nameField: HTMLInputElement,
    emailField: HTMLInputElement,
    messageField: HTMLInputElement,
  ): void {
    [nameField, emailField, messageField].forEach((field) => {
      field.value = '';
      field.classList.remove('valid-border', 'invalid-border');
    });

    [
      this.labelName.nativeElement,
      this.labelEmail.nativeElement,
      this.labelMessage.nativeElement,
    ].forEach((label) => label.classList.remove('valid', 'invalid'));
  }

  /**
   * function to unlock the form
   */
  private unlockForm(): void {
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
  protected checkFieldValidationIcon(
    field: HTMLInputElement | HTMLTextAreaElement,
    label: HTMLLabelElement,
  ): void {
    const isEmail = field.name === 'email';
    const hasDot = field.value.includes('.');

    if (isEmail && hasDot && field.checkValidity()) {
      this.styleValidFormField(field, label);
    } else if (isEmail && !hasDot) {
      this.styleInvalidFormField(field, label);
    } else if (!isEmail) {
      this.toggleStyleFormField(field, label);
    }
  }

  /**
   * function to style the form field as valid
   *
   * @param field the inputfield
   * @param label the ValidationIcon label
   */
  private styleValidFormField(
    field: HTMLInputElement | HTMLTextAreaElement,
    label: HTMLLabelElement,
  ): void {
    field.classList.add('valid-border');
    field.classList.remove('invalid-border');
    label.classList.add('valid');
    label.classList.remove('invalid');
    field.classList.add('valid-border', `${field.checkValidity()}`);
    field.classList.remove('invalid-border', `${!field.checkValidity()}`);
  }

  /**
   * function to style the form field as invalid
   *
   * @param field the inputfield
   * @param label the ValidationIcon label
   */
  private styleInvalidFormField(
    field: HTMLInputElement | HTMLTextAreaElement,
    label: HTMLLabelElement,
  ): void {
    field.classList.remove('valid-border');
    field.classList.add('invalid-border');
    label.classList.add('invalid');
    label.classList.remove('valid');
    field.classList.remove('valid-border', `${field.checkValidity()}`);
    field.classList.add('invalid-border', `${!field.checkValidity()}`);
  }

  /**
   * function to toggle the form field style
   *
   * @param field the inputfield
   * @param label the ValidationIcon label
   */
  private toggleStyleFormField(
    field: HTMLInputElement | HTMLTextAreaElement,
    label: HTMLLabelElement,
  ): void {
    label.classList.toggle('valid', field.checkValidity());
    label.classList.toggle('invalid', !field.checkValidity());
    field.classList.toggle('valid-border', field.checkValidity());
    field.classList.toggle('invalid-border', !field.checkValidity());
  }
}
