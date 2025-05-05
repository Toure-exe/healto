package org.example.report_microservice.repositories;

import org.example.report_microservice.models.Medicine;
import org.springframework.data.repository.CrudRepository;

public interface MedicineRepository extends CrudRepository<Medicine, Long> {
}
