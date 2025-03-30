package org.govt;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserGovtService {
    private final UserGovtRepository user;
    private final PasswordEncoder password;

    public UserGovtService(UserGovtRepository user){
        this.user=user;
        this.password=new BCryptPasswordEncoder();
    }

    public String registerGovt(String name, String username, String password, int age, String email, String govt_Id, String govt_department){
        if(user.findByUsername(username)!=null){
            return "User Already Exists!!!!";
        }
        User_govt userGovt=new User_govt(name,username,password,age,email,govt_Id,govt_department);
        user.save(userGovt);
        return "Registered Successfully!!!";
    }

    public boolean authenticateGovt(String username,String pass){
        User_govt govt=user.findByUsername(username);
        return govt!=null && password.matches(pass,govt.getPassword());
    }

}
