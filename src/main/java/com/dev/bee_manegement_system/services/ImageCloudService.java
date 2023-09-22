package com.dev.bee_manegement_system.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class    ImageCloudService {
    private final Cloudinary cloudinary;

    @Autowired
    public ImageCloudService() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dcpku1e5j",
                "api_key", "841221141398164",
                "api_secret", "VxxHmWudYMVQXExat7alomWgkv0",
                "secure", true));
    }


    public String saveImage(MultipartFile multipartFile) {
        try {
            Map<String, String> params = ObjectUtils.asMap(
                    "public_id", UUID.randomUUID().toString(),
                    "overwrite", true
            );

            Map<String, Object> uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), params);
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

