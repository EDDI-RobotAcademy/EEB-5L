package com.example.monoproj.config;

import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@Getter
@Configuration
@ConfigurationProperties(prefix = "frontend.authentication")
public class FrontendConfig {
    private List<String> origins;

    public void setOrigins(List<String> origins) {
        this.origins = origins;
    }
}
