package com.aura.service;



import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.aura.domain.PaymentMethod;
import com.aura.exception.UserException;
import com.aura.modal.PaymentOrder;
import com.aura.payload.dto.BookingDTO;
import com.aura.payload.dto.UserDTO;
import com.aura.payload.response.PaymentLinkResponse;


public interface PaymentService {

    PaymentLinkResponse createOrder(UserDTO user,
                                    BookingDTO booking, PaymentMethod paymentMethod) throws RazorpayException, UserException, StripeException;

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;

    Boolean ProceedPaymentOrder (PaymentOrder paymentOrder,
                                 String paymentId, String paymentLinkId) throws RazorpayException;

    PaymentLink createRazorpayPaymentLink(UserDTO user,
                                          Long Amount,
                                          Long orderId) throws RazorpayException;

    String createStripePaymentLink(UserDTO user, Long Amount,
                                            Long orderId) throws StripeException;
}
