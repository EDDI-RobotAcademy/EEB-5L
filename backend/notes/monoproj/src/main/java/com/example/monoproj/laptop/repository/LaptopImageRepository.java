package com.example.monoproj.laptop.repository;

import com.example.monoproj.laptop.entity.LaptopImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface LaptopImageRepository extends JpaRepository<LaptopImage, Long> {
    @Query(
            "SELECT li.laptop.id, li.imageUrl FROM LaptopImage li " +
                    "WHERE li.type = 'THUMBNAIL' AND li.laptop.id IN :laptopIds"
    )
    Map<Long, String> findThumbnailUrlsByLaptopIds(@Param("laptopIds") List<Long> laptopIds);

}
