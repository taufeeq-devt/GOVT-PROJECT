package org.govt;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserSupplierService {
    private final UserSupplierRepository user;
    private final PasswordEncoder password;

    public UserSupplierService(UserSupplierRepository user){
        this.user=user;
        this.password=new BCryptPasswordEncoder();
    }

    public String registerSupplier(String name,String username, String password,int age,int phone,String email,String gst_number,String address){
        if(user.findByUsername(username)!=null){
            return "User Already Exists!!";
        }
        User_Supplier Supplier=new User_Supplier(name,username,password,age,phone,email,gst_number,address);
        user.save(Supplier);
        return "User Registered!!!";
    }

    public boolean authenticateSupplier(String username,String password1){
        User_Supplier supplier=user.findByUsername(username);
        return supplier!=null && password.matches(password1,supplier.getPassword());
    }
}
