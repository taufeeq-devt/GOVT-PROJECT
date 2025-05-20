package org.govt.model;

import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Document("Projects")
@Setter
public class Project {

    @Id
    private String Id;

    private String title;
    private String description;
    private String departmentId;
    private String projectManagerId;
    private String assignedContractorId;
    private String supervisorId;
    private String status;
    private List<String> assignedSupplierIds;
    private BigDecimal budgetAllocated;
    private LocalDate startDate,endDate,createdAt;
    public Project(String title,String description,String departmentId,String projectManagerId,String assignedContractorId,String supervisorId,String status,BigDecimal budgetAllocated,LocalDate startDate,LocalDate endDate){
        this.title=title;
        this.description=description;
        this.departmentId=departmentId;
        this.projectManagerId=projectManagerId;
        this.assignedContractorId=assignedContractorId;
        this.supervisorId=supervisorId;
        this.status=status;
        this.budgetAllocated=budgetAllocated;
        this.startDate=startDate;
        this.endDate=endDate;
        this.createdAt=LocalDate.now();
    }
}
