package com.aura.messaging;

import lombok.RequiredArgsConstructor;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserEventProducer {
//    private final RabbitTemplate rabbitTemplate;

//    public void userCreatedEvent(UserDTO userDTO){
//        rabbitTemplate.convertAndSend("user-queue",userDTO);
//    }
}
