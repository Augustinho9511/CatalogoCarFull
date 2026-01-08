package CatalogodeCarro.service;

import CatalogodeCarro.model.dto.CarDTO;
import CatalogodeCarro.model.entity.Car;
import CatalogodeCarro.respository.CarResposity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarResposity carResposity;

    public List<Car> ListAll() {
        return carResposity.findAll();
    }

    public Car save(CarDTO dto) {
        Car car = new Car();
        car.setName(dto.name());
        car.setYear(dto.year());
        car.setMark(dto.mark());
        car.setKilometragem(dto.kilometragem());

        return carResposity.save(car);
    }

    public Car update(Long id,CarDTO dto) {
        return carResposity.findById(id).map(car -> {
                car.setName(dto.name());
                car.setYear(dto.year());
                car.setMark(dto.mark());
                car.setKilometragem(dto.kilometragem());

                return carResposity.save(car);
        }).orElseThrow(() -> new RuntimeException("Car com ID " + id + " não existe no catálogo."));
    }

    public void delete(Long id) {
        carResposity.deleteById(id);
    }
}
