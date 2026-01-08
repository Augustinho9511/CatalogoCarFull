package CatalogodeCarro.respository;

import CatalogodeCarro.model.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarResposity extends JpaRepository<Car, Long> {
}
