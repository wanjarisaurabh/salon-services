package com.aura.mapper;


import com.aura.modal.Notification;
import com.aura.payload.dto.BookingDTO;
import com.aura.payload.dto.NotificationDTO;
import org.springframework.stereotype.Service;

@Service
public class NotificationMapper {

    public NotificationDTO toDTO(Notification notification,
                                                         BookingDTO bookingDTO) {
        if (notification == null) {
            return null;
        }

        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setId(notification.getId());
        notificationDTO.setType(notification.getType());
        notificationDTO.setIsRead(notification.getIsRead());
        notificationDTO.setDescription(notification.getDescription());
        notificationDTO.setUserId(notification.getUserId());
        notificationDTO.setBookingId(notification.getBookingId());
        notificationDTO.setSalonId(notification.getSalonId());



        notificationDTO.setBooking(bookingDTO);

        return notificationDTO;
    }

}
