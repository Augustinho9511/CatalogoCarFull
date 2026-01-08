package CatalogodeCarro.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CarDTO (

    @NotBlank(message = "O name é obrigatório")
    String name,

    @NotBlank(message = "O mark é obrigatório")
    String mark,

    @NotNull(message = "O year é obrigatório")
    int year,

    @NotNull(message = "O km é obrigatório")
    int kilometragem

    ){
}
