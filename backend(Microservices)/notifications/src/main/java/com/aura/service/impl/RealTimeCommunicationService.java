package com.aura.service.impl;

import com.aura.payload.dto.NotificationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
@RequiredArgsConstructor
public class RealTimeCommunicationService {


    private final SimpMessagingTemplate simpMessagingTemplate;



    public void sendNotification(NotificationDTO notification) {
        simpMessagingTemplate.convertAndSend(
                "/notification/user/"+notification.getUserId(),
                notification
        );
        simpMessagingTemplate.convertAndSend(
                "/notification/salon/"+notification.getSalonId(),
                notification
        );
    }



}