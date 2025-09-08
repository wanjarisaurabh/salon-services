package com.aura.controller;

import com.aura.mapper.NotificationMapper;
import com.aura.modal.Notification;
import com.aura.payload.dto.BookingDTO;
import com.aura.payload.dto.NotificationDTO;
import com.aura.payload.dto.UserDTO;
import com.aura.service.NotificationService;
import com.aura.service.client.BookingFeignClient;
import com.aura.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;
    private final BookingFeignClient bookingFeignClient;
    private final UserFeignClient userFeignClient;

    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(
            @RequestBody Notification notification,
            @RequestHeader("Authorization") String jwt
    ) {
        try {
            UserDTO user = userFeignClient.getUserFromJwtToken(jwt).getBody();
            if (user != null) {
                notification.setUserId(user.getId()); // Optionally override userId
            }

            NotificationDTO createdNotification = notificationService.createNotification(notification);
            return ResponseEntity.ok(createdNotification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUserId(
            @PathVariable Long userId) {
        List<Notification> notifications = notificationService
                .getAllNotificationsByUserId(userId);

//        List<NotificationDTO> notificationDTOS=notifications.stream().map((notification)-> {
//            BookingDTO bookingDTO= bookingFeignClient
//                    .getBookingById(notification.getBookingId()).getBody();
//            return notificationMapper.toDTO(notification,bookingDTO);
//        }).collect(Collectors.toList());


        System.out.println("here we are  5555 ");

        return ResponseEntity.ok(notifications);
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications() {
        List<Notification> notifications = notificationService
                .getAllNotifications();

        System.out.println("here we are   3 ");
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationDTO> markNotificationAsRead(
            @PathVariable Long notificationId) throws Exception {
        Notification updatedNotification = notificationService
                .markNotificationAsRead(notificationId);
        BookingDTO bookingDTO= bookingFeignClient
                .getBookingById(updatedNotification.getBookingId()).getBody();

        NotificationDTO notificationDTO= notificationMapper.toDTO(
                updatedNotification,
                bookingDTO
        );
        System.out.println("here we are    4");
        return ResponseEntity.ok(notificationDTO);
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(
            @PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);


        System.out.println("here we are   5 ");
        return ResponseEntity.noContent().build();
    }
}
