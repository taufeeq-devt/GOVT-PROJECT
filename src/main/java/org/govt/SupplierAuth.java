package org.govt;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class SupplierAuth {
    private UserSupplierService user;

    public SupplierAuth(UserSupplierService user){
        this.user=user;
    }

    @PostMapping("/register/supplier")
    public String register(@RequestParam String name,@RequestParam String username,@RequestParam String password,@RequestParam int age,@RequestParam int phone,@RequestParam String email,@RequestParam String gst_number,@RequestParam String address){
        return user.registerSupplier(name,username,password,age,phone,email,gst_number,address);
    }

    @PostMapping("/login/supplier")
    public String login(@RequestParam String username,@RequestParam String password){
        if(user.authenticateSupplier(username,password)){
            return "LoggedIn Successfully!!!";
        }
        else{
            return "Invalid Credentials!!!";
        }
    }
}
