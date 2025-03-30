package org.govt;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/govt/auth")
public class GovtAuth {
    private UserGovtService user;

    public GovtAuth(UserGovtService user){
        this.user=user;
    }

    @PostMapping("/register")
    public String register(@RequestParam String name,@RequestParam String username,@RequestParam String password,@RequestParam int age, @RequestParam String email,@RequestParam String govt_Id,@RequestParam String govt_department){
        return user.registerGovt(name,username,password,age,email,govt_Id,govt_department);
    }

    @PostMapping("/login")
    public String login(@RequestParam String username,@RequestParam String password){
        if(user.authenticateGovt(username,password)){
            return "LoggedIn Successfully!!!";
        }
        else{
            return "Invalid Credentials!!!";
        }
    }
}
