package com.aura.messaging;


import com.aura.payload.dto.NotificationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sentNotificationEvent(Long bookingId,
                                      Long userId,
                                      Long salonId) {
        NotificationDTO notification=new NotificationDTO();
        notification.setBookingId(bookingId);
        notification.setSalonId(salonId);
        notification.setUserId(userId);
        notification.setDescription("new booking got confirmed");
        notification.setType("BOOKING");

        rabbitTemplate.convertAndSend("notification-queue", notification);

    }
}
