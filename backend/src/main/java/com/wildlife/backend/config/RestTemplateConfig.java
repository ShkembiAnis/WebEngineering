package com.wildlife.backend.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .setConnectTimeout(Duration.ofSeconds(10))
                .setReadTimeout(Duration.ofSeconds(10))
                .additionalInterceptors(userAgentInterceptor())
                .build();
    }

    private ClientHttpRequestInterceptor userAgentInterceptor() {
        return (request, body, execution) -> {
            request.getHeaders().set("User-Agent", "WildlifeWebsiteBackend/1.0 (Educational Project; contact: student@university.edu)");
            return execution.execute(request, body);
        };
    }
}

