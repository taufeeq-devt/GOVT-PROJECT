package org.govt.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document (collection = "User_Supervisor")
@Getter
@Setter
public class User_Supervisor implements UserDetails {
    @Id
    private String id;

    private String name,password,username,DOB,email,govt_Id,govt_department,pincode;
    private String[] connect;
    private boolean approved;

    public User_Supervisor(String name,String username, String password,String DOB,String email,String govt_Id,String govt_department,String pincode){
        this.name=name;
        this.username=username;
        this.password=password;
        this.DOB=DOB;
        this.email=email;
        this.govt_Id=govt_Id;
        this.govt_department=govt_department;
        this.pincode=pincode;
        this.approved=false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
