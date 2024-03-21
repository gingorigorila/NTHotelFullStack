package com.tuaminh.lakesidehotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })

public class LakesideHotelApplication {

	public static void main(String[] args) {
		SpringApplication.run(LakesideHotelApplication.class, args);
	}

}
