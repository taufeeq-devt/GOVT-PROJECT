package org.govt.service;

import org.govt.model.Project;
import org.govt.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class ProjectService {
    private ProjectRepository project;

    public ProjectService(ProjectRepository project){
        this.project=project;
    }
    public String AddProject(String title, String description, String departmentId, String projectManagerId, String assignedContractorId, String supervisorId, BigDecimal budgetAllocated, LocalDate startDate, LocalDate endDate){
        Project project1=new Project(title,description,departmentId,projectManagerId,assignedContractorId,supervisorId,"BIDDING",budgetAllocated,startDate,endDate);
        project.save(project1);
        return "Project Added....";
    }
    public String RemoveProject(String id){
        Optional<Project> project1= project.findById(id);
        if(project.findById(id).isPresent()){
            project.delete(project1.get());
            return "Removed The Project";
        }
        return "Project Doesn't Exists";
    }
    public String AssignProject(String projectid,String Contractorid){
        Optional<Project> project1=project.findById(projectid);
        if(project.findById(projectid).isPresent()){
            Project Project=project1.get();
            Project.setAssignedContractorId(Contractorid);
            project.save(Project);
            return "Project "+projectid+" Assigned to"+Contractorid;
        }
        return "project Doesn't Exists!!";
    }
}
