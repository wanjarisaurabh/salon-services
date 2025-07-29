package com.aura.configrations;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {
	
	
	private  JavaMailSender javaMailSender;
	
	public EmailUtil(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	public  void sendOtpEmail(String email, String otp) throws MessagingException {
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
		
		String subject = "Verify OTP";
		String text = "Your Verification code is : " + otp;
		
		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText(text);
		mimeMessageHelper.setTo(email);
		
		try {
			
			javaMailSender.send(mimeMessage);
			
		} catch (MailException e) {
			
			throw new MailSendException(e.getMessage());
		}
		
		
	}

}
