package org.govt.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "govt_officers")
@Getter
@Setter
public class User_govt {
    @Id
    private String id;

    private String name;
    private String password;
    private String username;
    private String DOB;
    private String email;
    private String govt_Id;
    private String govt_department;
    private boolean approved;


    public User_govt(String name,String username, String password,String DOB,String email,String govt_Id,String govt_department){
        this.name=name;
        this.username=username;
        this.password=password;
        this.DOB=DOB;
        this.email=email;
        this.govt_Id=govt_Id;
        this.govt_department=govt_department;
        this.approved=false;
    }

}
