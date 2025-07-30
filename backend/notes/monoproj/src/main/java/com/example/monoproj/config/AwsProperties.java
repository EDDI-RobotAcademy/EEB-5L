package com.example.monoproj.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@ConfigurationProperties(prefix = "cloud.aws")
public class AwsProperties {

    private S3 s3 = new S3();
    private Credentials credentials = new Credentials();
    private String region;

    public static class S3 {
        private String bucket;
        public String getBucket() { return bucket; }
        public void setBucket(String bucket) { this.bucket = bucket; }
    }

    public static class Credentials {
        private String accessKey;
        private String secretKey;

        public String getAccessKey() { return accessKey; }
        public void setAccessKey(String accessKey) { this.accessKey = accessKey; }

        public String getSecretKey() { return secretKey; }
        public void setSecretKey(String secretKey) { this.secretKey = secretKey; }
    }

    public void setRegion(String region) { this.region = region; }
}

