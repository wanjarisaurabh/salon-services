package com.aura.messaging;

import com.aura.payload.dto.UserDTO;
import lombok.RequiredArgsConstructor;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserEventProducer {
//    private final RabbitTemplate rabbitTemplate;

    public void userCreatedEvent(UserDTO userDTO){
        System.out.println("rabbit mq");
    }
}
