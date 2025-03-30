package org.govt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
@Getter
@Setter
public class User_contractor {
    @Id
    private String id;

    private String name;
    private String password;
    private String username;
    private int age;
    private int phone;
    private String email;
    private String gst_number;
    private String address;
    private boolean approved;

    public User_contractor(String name,String username, String password,int age,int phone,String email,String gst_number,String address){
        this.name=name;
        this.username=username;
        this.password=password;
        this.age=age;
        this.phone=phone;
        this.email=email;
        this.gst_number=gst_number;
        this.address=address;
        this.approved=false;
    }

    public String getPassword() {
        return password;
    }
}
