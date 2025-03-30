package org.govt;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contractor/auth")
public class ContractorAuth {
    private UserContractorService user;

    public ContractorAuth(UserContractorService user){
        this.user=user;
    }

    @PostMapping("/register")
    public String register(@RequestParam String name, @RequestParam String username, @RequestParam String password, @RequestParam int age, @RequestParam int phone, @RequestParam String email, @RequestParam String gst_number, @RequestParam String address){
        return user.registerContractor(name,username,password,age,phone,email,gst_number,address);
    }

    @PostMapping("/login")
    public String login(@RequestParam String username,@RequestParam String password){
        if(user.authenticateContractor(username,password)){
            return "LoggedIn Successfully!!!";
        }
        else{
            return "Invalid Credentials!!!";
        }
    }
}
