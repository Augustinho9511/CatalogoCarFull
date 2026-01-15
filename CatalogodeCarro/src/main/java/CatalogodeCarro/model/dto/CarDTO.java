package CatalogodeCarro.model.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CarDTO (

    @NotBlank(message = "O name é obrigatório")
    String name,

    @NotBlank(message = "O mark é obrigatório")
    String make,

    @NotNull(message = "O price é obrigatório")
    double price,

    @NotNull(message = "O year é obrigatório")
    int year,

    @NotBlank(message = "O warranty é obrigatório")
    String warranty,

    @NotNull(message = "O km é obrigatório")
    int kilometragem,

    @NotBlank(message = "O condition é obrigatório")
    String condition,

    @NotBlank(message = "O serviceHistory é obrigatório")
    String serviceHistory,

    @NotBlank(message = "O fuelType é obrigatório")
    String fuelType,

    @NotBlank(message = "O transmission é obrigatório")
    String transmission,

    @NotBlank(message = "O engine é obrigatório")
    String engine,

    @NotBlank(message = "O doors é obrigatório")
    String doors,

    @NotBlank(message = "O exteriorColor é obrigatório")
    String exteriorColor,

    @NotBlank(message = "O interiorColor é obrigatório")
    String interiorColor,

    @Column(length = 1000)
    String imageUrl

    ){
}
