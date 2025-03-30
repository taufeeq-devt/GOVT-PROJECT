package org.govt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "users")
@Getter
@Setter
public class User_govt {
    @Id
    private String id;

    private String name;
    private String password;
    private String username;
    private int age;
    private String email;
    private String govt_Id;
    private String govt_department;
    private boolean approved;


    public User_govt(String name,String username, String password,int age,String email,String govt_Id,String govt_department){
        this.name=name;
        this.username=username;
        this.password=password;
        this.age=age;
        this.email=email;
        this.govt_Id=govt_Id;
        this.govt_department=govt_department;
        this.approved=false;
    }

    public String getPassword(){
        return password;
    }
}
