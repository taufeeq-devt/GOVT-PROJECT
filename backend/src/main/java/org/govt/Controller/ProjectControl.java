package org.govt.Controller;

import org.govt.model.Project;
import org.govt.repository.ProjectRepository;
import org.govt.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/projects")
public class ProjectControl {
    @Autowired
    private ProjectRepository project;
    private ProjectService projectservice;

    @GetMapping("/")
    public List<Project> getAllProject(){
        return project.findAll();
    }

    @PostMapping("/")
    public String AddProject(String title, String description, String departmentId, String projectManagerId, String assignedContractorId, String supervisorId, BigDecimal budgetAllocated, LocalDate startDate, LocalDate endDate){
        return projectservice.AddProject(title,description,departmentId,projectManagerId,assignedContractorId,supervisorId,budgetAllocated,startDate,endDate);
    }

    @PostMapping("/{id}/assign")
    public String assignProject(@PathVariable String id,String contractorid){
        if(project.findById(id)!=null){
            return projectservice.AssignProject(id,contractorid);
        }
        return "Project Doesn't Exists!!";
    }
}
