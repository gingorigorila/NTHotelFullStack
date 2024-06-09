package com.tuaminh.lakesidehotel.service;

import com.tuaminh.lakesidehotel.model.Role;
import com.tuaminh.lakesidehotel.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);
    void DeleteRole(Long id);
    Role findByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUserFromRole(Long roleId);


}
