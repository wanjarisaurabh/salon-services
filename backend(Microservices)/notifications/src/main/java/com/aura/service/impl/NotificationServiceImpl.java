package com.aura.service.impl;

import com.aura.mapper.NotificationMapper;
import com.aura.modal.Notification;
import com.aura.payload.dto.BookingDTO;
import com.aura.payload.dto.NotificationDTO;
import com.aura.repository.NotificationRepository;
import com.aura.service.NotificationService;
import com.aura.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final BookingFeignClient bookingFeignClient;
    private final RealTimeCommunicationService realTimeCommunicationService;



    @Override
    public NotificationDTO createNotification(Notification notification) {

        Notification savedNotification= notificationRepository.save(notification);

        BookingDTO bookingDTO= bookingFeignClient
                .getBookingById(savedNotification.getBookingId()).getBody();

        NotificationDTO notificationDTO= notificationMapper.toDTO(
                savedNotification,
                bookingDTO
        );
//        notificationRepository.save()
        realTimeCommunicationService.sendNotification(notificationDTO);
        return notificationDTO;
    }

    @Override
    public List<Notification> getAllNotificationsByUserId(Long userId) {
        System.out.println(userId);
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public List<Notification> getAllNotificationsBySalonId(Long salonId) {
        return notificationRepository.findBySalonId(salonId);
    }

    @Override
    public Notification markNotificationAsRead(Long notificationId) throws Exception {
        return notificationRepository.findById(notificationId).map(notification -> {
            notification.setIsRead(true);
            return notificationRepository.save(notification);
        }).orElseThrow(() -> new Exception("Notification not found"));
    }

    @Override
    public void deleteNotification(Long notificationId) {
        if (notificationRepository.existsById(notificationId)) {
            notificationRepository.deleteById(notificationId);
        } else {
            throw new RuntimeException("Notification not found");
        }
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
}
