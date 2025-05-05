package org.example.report_microservice.controllers;

import org.example.report_microservice.DTO.ReportAndTherapyDTO;
import org.example.report_microservice.models.Report;
import org.example.report_microservice.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping(value = "/insert-report", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> insertReport(@RequestPart("reportAndTherapyDTO") ReportAndTherapyDTO dto,
                                               @RequestPart(value = "file", required = false) MultipartFile file) {
        String arrythmiaResult = null;


        if (file != null && !file.isEmpty()) {
            arrythmiaResult = sendFileToArrythmia(file);
            if (arrythmiaResult == null) {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                        .body("Errore durante la chiamata al microservizio arrythmia");
            }

            // (opzionale) Log delle predizioni
            System.out.println("Predizioni arrythmia: " + arrythmiaResult);
        }

        boolean inserted = reportService.insertReport(dto);
        if (inserted) {
            String responseMsg = "Report inserito con successo";
            if (arrythmiaResult != null) {
                responseMsg += "\nPredizioni: " + arrythmiaResult;
            }
            return ResponseEntity.ok(responseMsg);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Errore durante l'inserimento del report");
        }
    }

    @RequestMapping("/get-reports-by-email")
    public ResponseEntity<List<ReportAndTherapyDTO>> getReportsByEmail(@RequestParam("email") String email, @RequestParam("role") String role) {
        List<ReportAndTherapyDTO> reports = reportService.getReportsByEmail(email, role);
        if (reports != null)
            return ResponseEntity.ok(reports);
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    private String sendFileToArrythmia(MultipartFile file) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String url = "http://localhost:8000/upload"; // URL del microservizio arrythmia

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);


            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody(); // JSON delle predizioni
            } else {
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
