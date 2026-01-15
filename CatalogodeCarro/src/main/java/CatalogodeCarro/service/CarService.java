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
        car.setMake(dto.make());
        car.setKilometragem(dto.kilometragem());
        car.setPrice(dto.price());
        car.setCondition(dto.condition());
        car.setDoors(dto.doors());
        car.setEngine(dto.engine());
        car.setFuelType(dto.fuelType());
        car.setTransmission(dto.transmission());
        car.setServiceHistory(dto.serviceHistory());
        car.setWarranty(dto.warranty());
        car.setExteriorColor(dto.exteriorColor());
        car.setInteriorColor(dto.interiorColor());

        return carResposity.save(car);
    }

    public Car update(Long id,CarDTO dto) {
        return carResposity.findById(id).map(car -> {
                car.setName(dto.name());
                car.setYear(dto.year());
                car.setMake(dto.make());
                car.setKilometragem(dto.kilometragem());
                car.setPrice(dto.price());
                car.setCondition(dto.condition());
                car.setDoors(dto.doors());
                car.setEngine(dto.engine());
                car.setFuelType(dto.fuelType());
                car.setTransmission(dto.transmission());
                car.setServiceHistory(dto.serviceHistory());
                car.setWarranty(dto.warranty());
                car.setExteriorColor(dto.exteriorColor());
                car.setInteriorColor(dto.interiorColor());

                return carResposity.save(car);
        }).orElseThrow(() -> new RuntimeException("Car com ID " + id + " não existe no catálogo."));
    }

    public void delete(Long id) {
        carResposity.deleteById(id);
    }
}
