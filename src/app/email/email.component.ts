import { Component } from '@angular/core';
import { EmailService } from '../_services/email.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  email = {
    to: '',
    subject: '',
    text: ''
  };
  responseMessage: string | null = null;
  isSuccess: boolean | null = null // Trạng thái success/failure
  isLoading: boolean = false; // Hiển thị trạng thái gửi email

  constructor(private emailService: EmailService) {}

  sendEmail() {
    this.emailService.sendEmail(this.email).subscribe({
      next: (response) => {
        this.isSuccess = true;
        this.responseMessage = 'Email sent successfully!';
        this.email = { to: '', subject: '', text: '' };  // Reset form
      },
      error: (error) => {
        this.isSuccess = false
        this.responseMessage = 'Failed to send email. Please try again.';
      }
    });
  }
  

  // Xác thực form đơn giản
  isFormValid(): boolean {
    // Kiểm tra xem các trường có rỗng hay không
    return this.email.to.trim() !== '' && 
           this.email.subject.trim() !== '' && 
           this.email.text.trim() !== '';
  }

  // Reset form
  private resetForm() {
    this.email = {
      to: '',
      subject: '',
      text: ''
    };
  }
}
