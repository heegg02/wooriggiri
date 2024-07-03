package com.wooriggiri.app.domain;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsDTO {
    private List<?> result;
    private Map<String, Object> metadata;
}
