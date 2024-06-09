package com.tuaminh.lakesidehotel.controller;

import com.tuaminh.lakesidehotel.exception.ResourceNotFoundException;
import com.tuaminh.lakesidehotel.exception.RoleAlreadyExistsException;
import com.tuaminh.lakesidehotel.model.Role;
import com.tuaminh.lakesidehotel.model.Room;
import com.tuaminh.lakesidehotel.model.User;
import com.tuaminh.lakesidehotel.response.RoomResponse;
import com.tuaminh.lakesidehotel.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.FOUND;
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    private final IRoleService roleService;
    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles(){
        List<Role> roles = roleService.getRoles();
        return ResponseEntity.ok(roles);
    }
    @PostMapping("/create-new-role")

    public ResponseEntity<String> createRole(@RequestBody Role theRole){
        try{
            roleService.createRole(theRole);
            return ResponseEntity.ok("Role da duoc tao thanh cong");
        }catch(RoleAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId){
        roleService.DeleteRole(roleId);
    }
    @PostMapping("/delete-all-users-from-role/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId){
        return roleService.removeAllUserFromRole(roleId);
    }

    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(@RequestParam("userId") Long userId,
                                   @RequestParam("roleId") Long roleId){
        return roleService.removeUserFromRole(userId,roleId);
    }
    @PostMapping("/assign-role-to-user")
    public User assignRoleToUser(@RequestParam("userId") Long userId,
                                 @RequestParam("roleId") Long roleId){
        System.out.println("User");
        System.out.println(userId);
        return roleService.assignRoleToUser(userId,roleId);
    }
}
