package org.example.report_microservice.repositories;

import org.example.report_microservice.models.Therapy;
import org.springframework.data.repository.CrudRepository;

public interface TherapyRepository extends CrudRepository<Therapy, Integer> {
}
