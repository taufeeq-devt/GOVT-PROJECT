package org.govt.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contractor")
@Getter
@Setter
public class User_contractor {
    @Id
    private String id;

    private String name;
    private String password;
    private String username;
    private String DOB;
    private long phone;
    private String email;
    private String gst_number;
    private String address;
    private boolean approved;
    private String pincode;

    public User_contractor(String name,String username, String password,String DOB,long phone,String email,String gst_number,String address,String pincode){
        this.name=name;
        this.username=username;
        this.password=password;
        this.DOB=DOB;
        this.phone=phone;
        this.email=email;
        this.gst_number=gst_number;
        this.address=address;
        this.pincode=pincode;
        this.approved=false;
    }
}
