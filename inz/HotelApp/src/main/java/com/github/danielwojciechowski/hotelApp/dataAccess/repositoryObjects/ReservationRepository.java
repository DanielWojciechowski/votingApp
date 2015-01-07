package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Reservation;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Room;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.RoomsInReservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@RepositoryRestResource
public interface ReservationRepository extends CrudRepository<Reservation, Long>{
    List<Reservation> findById(@Param("id") Long id);
    @Query(FIND_RESERVATIONS_OF_CLIENT_BY_PESEL)
    List<Reservation> findClientReservationsByPesel(@Param("pesel") String pesel);

    public final static String FIND_RESERVATIONS_OF_CLIENT_BY_PESEL = "select distinct r from Reservation r " +
            "LEFT JOIN r.owner o " +
            "where o.pesel = :pesel " +
            "order by r.id desc";
}
