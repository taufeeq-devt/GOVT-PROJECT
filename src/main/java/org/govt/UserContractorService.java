package org.govt;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserContractorService {
    private final UserContractorRepository user;
    private final PasswordEncoder password;

    public UserContractorService(UserContractorRepository user){
        this.user=user;
        this.password=new BCryptPasswordEncoder();
    }

    public String registerContractor(String name,String username, String password,int age,int phone,String email,String gst_number,String address){
        if(user.findByUsername(username)!=null){
            return "User already Exist!!";
        }
        User_contractor Contractor = new User_contractor(name,username,password,age,phone,email,gst_number,address);
        user.save(Contractor);
        return "Registered Successfully!!!";
    }

    public boolean authenticateContractor(String username,String password1){
        User_contractor contractor= user.findByUsername(username);
        return contractor!=null && password.matches(password1,contractor.getPassword());
    }
}
