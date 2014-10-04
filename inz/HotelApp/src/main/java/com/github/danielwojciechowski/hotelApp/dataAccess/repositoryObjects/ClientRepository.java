package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Client;

public interface ClientRepository extends CrudRepository<Client, Integer> {
	List<Client> findByFirstName(@Param("firstName") String firstName);
}
