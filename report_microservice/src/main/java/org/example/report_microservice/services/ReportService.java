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
import java.util.Optional;

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
        report.setBookingId(dto.getBookingId());

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

    public boolean updateReport(ReportAndTherapyDTO dto){
        Optional<Report> result = reportRepository.findById(dto.getReportId());
        if(result.isPresent()){
            Report report =  result.get();
            report.setReportId(dto.getReportId());
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
            report.setBookingId(dto.getBookingId());
            if (dto.getTherapyDescription() != null && !dto.getTherapyDescription().isEmpty()) {
                Therapy therapy = new Therapy();
                therapy.setTherapyDescription(dto.getTherapyDescription());
                List<Medicine> medicines = new ArrayList<>();
                if (dto.getMedicines() != null) {
                    for (MedicineDTO medDto : dto.getMedicines()) {
                        Medicine medicine = new Medicine();
                        medicine.setMedicineName(medDto.getMedicineName());
                        medicine.setMedicineDosage(medDto.getMedicineDosage());
                        medicine.setMedicineFrequency(medDto.getMedicineFrequency());
                        medicine.setMedicineDurationInDays(medDto.getMedicineDurationInDays());
                        medicines.add(medicine);
                    }
                    therapy.setMedicines(medicines);
                    therapy.setReport(report);
                }
            }
            Report res = reportRepository.save(report);
            return (res.getReportId() > 0 && res != null);
        }
        return false;
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
   public ReportAndTherapyDTO  getReportByIdBooking(int bookingId) {
        ReportAndTherapyDTO dto = null;
        Report result = reportRepository.findByBookingId(bookingId);
        if(result != null) {
            dto = new ReportAndTherapyDTO();
            dto.setReportId(result.getReportId());
            dto.setDoctorEmail(result.getDoctorEmail());
            dto.setPatientEmail(result.getPatientEmail());
            dto.setReportDate(result.getReportDate());
            dto.setBloodPressure(result.getBloodPressure());
            dto.setBloodType(result.getBloodType());
            dto.setTemperature(result.getTemperature());
            dto.setWeight(result.getWeight());
            dto.setHeight(result.getHeight());
            dto.setSymptoms(result.getSymptoms());
            dto.setClinicalNotes(result.getClinicalNotes());

            if (result.getTherapy() != null) {
                dto.setTherapyId(result.getTherapy().getTherapyId());
                dto.setTherapyDescription(result.getTherapy().getTherapyDescription());

                List<MedicineDTO> medicineDTOs = new ArrayList<>();
                for (Medicine m : result.getTherapy().getMedicines()) {
                    MedicineDTO mDto = new MedicineDTO();
                    mDto.setMedicineName(m.getMedicineName());
                    mDto.setMedicineDosage(m.getMedicineDosage());
                    mDto.setMedicineFrequency(m.getMedicineFrequency());
                    mDto.setMedicineDurationInDays(m.getMedicineDurationInDays());
                    medicineDTOs.add(mDto);
                }
                dto.setMedicines(medicineDTOs);
            }

        }
        return dto;
   }

}
