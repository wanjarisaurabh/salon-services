package com.aura.exception;


import com.aura.payload.response.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {


	@ExceptionHandler(UserException.class)
	public ResponseEntity<ExceptionResponse> UserExceptionHandler(
			UserException ex, WebRequest req) {
		ExceptionResponse response = new ExceptionResponse(
				ex.getMessage(),
				req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}




	@ExceptionHandler(ReviewException.class)
	public ResponseEntity<ExceptionResponse> ReviewExistExceptionHandler(
			ReviewException ex, WebRequest req) {
		ExceptionResponse response = new ExceptionResponse(
				ex.getMessage(),
				req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionResponse> ExceptionHandler(Exception ex, WebRequest req) {
		ExceptionResponse response = new ExceptionResponse(
				ex.getMessage(),
				req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

}
