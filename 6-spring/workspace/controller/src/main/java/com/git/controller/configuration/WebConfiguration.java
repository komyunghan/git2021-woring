package com.git.controller.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	// CORS(cross origin resource sharing)을 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
        	// 공유정책을 적용할 리소스
        	.addMapping("/**")  // /** -> 전체리소스를 허용(/todos, /contacts, ...)
        	// 공유정책을 허용할 오리진(클라이언트주소)목록
        	.allowedOrigins(
        			"http://localhost:3000", 
        			"http://ec2-3-38-98-212.ap-northeast-2.compute.amazonaws.com/")
        	.allowedMethods("*");
    }
}
