package com.tuaminh.NThotel.service;


import com.tuaminh.NThotel.exception.UserAlreadyExistsException;
import com.tuaminh.NThotel.model.Role;
import com.tuaminh.NThotel.model.User;
import com.tuaminh.NThotel.repository.RoleRepository;
import com.tuaminh.NThotel.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public User registerUser(User user) {
        if(userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail()+" Đã tồn tại");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole=roleRepository.findByName("ROLE_ADMIN").get();
        user.setRoles(Collections.singleton(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
         User theUser = getUser(email);
         if(theUser !=null) {
             userRepository.deleteByEmail(email);
         }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).
                orElseThrow(()->new UsernameNotFoundException("User not found"));
    }
}
