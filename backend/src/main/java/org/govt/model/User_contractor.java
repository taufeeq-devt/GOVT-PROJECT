package org.govt.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document(collection = "contractor")
@Getter
@Setter
public class User_contractor implements UserDetails {
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
