package org.govt;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSupplierRepository extends MongoRepository<User_Supplier,String> {
    User_Supplier findByUsername(String username);
}
