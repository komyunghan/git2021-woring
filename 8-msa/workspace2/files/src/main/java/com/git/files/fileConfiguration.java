package com.git.files;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class fileConfiguration {

    // S3에 접속하는 클라이언트를 싱글톤으로 생성
    // Spring에서 의존 주입해주는 객체로 사용하겠다.
    @Bean
    public AmazonS3 getS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey:"", secretKey:"")

        return null;
    }
}
