package com.tuaminh.lakesidehotel.service;

import com.tuaminh.lakesidehotel.exception.RoleAlreadyExistsException;
import com.tuaminh.lakesidehotel.exception.UserAlreadyExistsException;
import com.tuaminh.lakesidehotel.model.Role;
import com.tuaminh.lakesidehotel.model.User;
import com.tuaminh.lakesidehotel.repository.RoleRepository;
import com.tuaminh.lakesidehotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService{
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName= "ROLE_"+theRole.getName().toUpperCase();
        Role role =new Role(roleName);
        if(roleRepository.existsByName(role)){
            throw new RoleAlreadyExistsException(theRole.getName()+" role da co san");
        }
        return roleRepository.save(role);
    }

    @Override
    public void DeleteRole(Long roleId) {
        this.removeAllUserFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role=roleRepository.findById(roleId);
        if(role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("Khong tim thay tai khoan");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role=roleRepository.findById(roleId);
        if(user.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new UserAlreadyExistsException(
                    user.get().getFirstName() + " da duoc gan san " + role.get().getName() + " role");
        }
        if (role.isPresent()){
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }

        return user.get();
    }

    @Override
    public Role removeAllUserFromRole(Long roleId) {
        Optional<Role> role=roleRepository.findById(roleId);
        role.get().removeAllUsersFromRole();
        return roleRepository.save(role.get());
    }


}
