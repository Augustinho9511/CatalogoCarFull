package CatalogodeCarro.controller;


import CatalogodeCarro.model.dto.CarDTO;
import CatalogodeCarro.model.entity.Car;
import CatalogodeCarro.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/catalogo")
public class CarController {

    @Autowired
    private CarService service;

    @GetMapping
    public List<Car> ListAll() {
        return service.ListAll();
    }

    @PostMapping
    public ResponseEntity<Car> save(@RequestBody CarDTO dto) {
        return ResponseEntity.status(201).body(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> edit(@PathVariable Long id, @RequestBody CarDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
