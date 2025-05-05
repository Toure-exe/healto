package org.example.report_microservice.services;

import jakarta.transaction.Transactional;
import org.example.report_microservice.DTO.MedicineDTO;
import org.example.report_microservice.DTO.ReportAndTherapyDTO;
import org.example.report_microservice.models.Medicine;
import org.example.report_microservice.models.Report;
import org.example.report_microservice.models.Therapy;
import org.example.report_microservice.repositories.MedicineRepository;
import org.example.report_microservice.repositories.ReportRepository;
import org.example.report_microservice.repositories.TherapyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public boolean insertReport(ReportAndTherapyDTO dto) {
        Report report = new Report();
        report.setDoctorEmail(dto.getDoctorEmail());
        report.setPatientEmail(dto.getPatientEmail());
        report.setReportDate(dto.getReportDate());
        report.setBloodPressure(dto.getBloodPressure());
        report.setBloodType(dto.getBloodType());
        report.setTemperature(dto.getTemperature());
        report.setWeight(dto.getWeight());
        report.setHeight(dto.getHeight());
        report.setSymptoms(dto.getSymptoms());
        report.setClinicalNotes(dto.getClinicalNotes());

        // Gestione terapia e lista medicine
        if (dto.getTherapyDescription() != null && !dto.getTherapyDescription().isEmpty()) {
            Therapy therapy = new Therapy();
            therapy.setTherapyDescription(dto.getTherapyDescription());
            therapy.setReport(report);

            List<Medicine> medicines = new ArrayList<>();
            if (dto.getMedicines() != null) {
                for (MedicineDTO medDto : dto.getMedicines()) {
                    Medicine medicine = new Medicine();
                    medicine.setMedicineName(medDto.getMedicineName());
                    medicine.setMedicineDosage(medDto.getMedicineDosage());
                    medicine.setMedicineFrequency(medDto.getMedicineFrequency());
                    medicine.setMedicineDurationInDays(medDto.getMedicineDurationInDays());
                    medicine.setTherapy(therapy); // relazione inversa
                    medicines.add(medicine);
                }
            }

            therapy.setMedicines(medicines);
            report.setTherapy(therapy);
        }

        Report savedReport = reportRepository.save(report);
        return savedReport.getReportId() > 0;
    }


    @Transactional
   public List<ReportAndTherapyDTO> getReportsByEmail(String email, String role) {
        List<Report> reports = new ArrayList<>();
        switch (role) {
            case "patient":
                reports = reportRepository.findByPatientEmail(email);
                break;
            case "doctor":
                reports = reportRepository.findByDoctorEmail(email);
                break;
        }

        for (Report r : reports) {
            r.getTherapy(); // attiva il fetch lazy (per recuperare sia le terapie che le medicine)
        }

        //System.out.println(reports.get(0).getTherapy().getMedicines().getFirst().getMedicineName());
        List<ReportAndTherapyDTO> result = new ArrayList<>();
        for (Report r : reports) {
            ReportAndTherapyDTO dto = new ReportAndTherapyDTO();
            dto.setReportId(r.getReportId());
            dto.setDoctorEmail(r.getDoctorEmail());
            dto.setPatientEmail(r.getPatientEmail());
            dto.setReportDate(r.getReportDate());
            dto.setBloodPressure(r.getBloodPressure());
            dto.setBloodType(r.getBloodType());
            dto.setTemperature(r.getTemperature());
            dto.setWeight(r.getWeight());
            dto.setHeight(r.getHeight());
            dto.setSymptoms(r.getSymptoms());
            dto.setClinicalNotes(r.getClinicalNotes());

            if (r.getTherapy() != null) {
                dto.setTherapyId(r.getTherapy().getTherapyId());
                dto.setTherapyDescription(r.getTherapy().getTherapyDescription());

                List<MedicineDTO> medicineDTOs = new ArrayList<>();
                for (Medicine m : r.getTherapy().getMedicines()) {
                    MedicineDTO mDto = new MedicineDTO();
                    mDto.setMedicineName(m.getMedicineName());
                    mDto.setMedicineDosage(m.getMedicineDosage());
                    mDto.setMedicineFrequency(m.getMedicineFrequency());
                    mDto.setMedicineDurationInDays(m.getMedicineDurationInDays());
                    medicineDTOs.add(mDto);
                }
                dto.setMedicines(medicineDTOs);
            }

            result.add(dto);
        }

        return result;
   }

}
