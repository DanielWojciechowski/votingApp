package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import java.util.List;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Reservation;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Client;

@RepositoryRestResource
public interface ClientRepository extends CrudRepository<Client, Long> {
	List<Client> findByFirstName(@Param("firstName") String firstName);
	List<Client> findByPeselStartingWith(@Param("pesel") String pesel);
	@Query(FIND_CLIENT_BY_RESERVATION_ID)
	List<Client> findClientByReservationId(@Param("id") Long id);

	public final static String FIND_CLIENT_BY_RESERVATION_ID = "select distinct o from Reservation r " +
			"LEFT JOIN r.owner o " +
			"where r.id = :id ";
}
