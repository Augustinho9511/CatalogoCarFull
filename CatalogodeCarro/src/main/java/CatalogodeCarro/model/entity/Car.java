package CatalogodeCarro.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double price;
    private String name;
    private String make;
    private String warranty;
    private int year;
    private int kilometragem;
    private String condition;
    private String serviceHistory;
    private String fuelType;
    private String transmission;
    private String engine;
    private String doors;
    private String exteriorColor;
    private String interiorColor;
    private String imageUrl;

}
