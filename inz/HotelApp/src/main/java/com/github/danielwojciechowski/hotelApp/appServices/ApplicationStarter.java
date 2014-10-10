package com.github.danielwojciechowski.hotelApp.appServices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
@ComponentScan("com.github.danielwojciechowski.hotelApp")
@EnableJpaRepositories("com.github.danielwojciechowski.hotelApp.dataAccess.RepositoryObjects")
@Import(RepositoryRestMvcConfiguration.class)
@EnableAutoConfiguration
@EntityScan("com.github.danielwojciechowski.hotelApp.dataAccess.pojo")
public class ApplicationStarter {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationStarter.class, args);
	}

}