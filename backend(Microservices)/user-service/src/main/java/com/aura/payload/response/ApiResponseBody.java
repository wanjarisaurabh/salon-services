package com.aura.payload.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.aura.domain.InternalCodeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // to exclude non-null feild
public class ApiResponseBody<T> {
    private boolean success;
    private String message;

    @JsonIgnore
    private InternalCodeEnum internalCode;
    private String timestamp;
    private final T data;

    public ApiResponseBody(boolean success, String message, InternalCodeEnum internalCode, T data) {
        this.success = success;
        this.message = message;
        this.internalCode = internalCode;
        this.timestamp = LocalDateTime.now().toString();
        this.data = data;
    }

    public ApiResponseBody(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.timestamp = ZonedDateTime.now(ZoneOffset.UTC) //This is a best practice for APIs — using standardized, timezone-aware timestamps.
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX"));
        this.data = data;
    }
}