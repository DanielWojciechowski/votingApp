package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.RoomsInReservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Date;
import java.util.List;

@RepositoryRestResource
public interface RoomsInReservationRepository extends CrudRepository<RoomsInReservation, Long>{
    @Query(FIND_ROOMSINRESERVATION_BY_RESERVATION_ID)
    List<RoomsInReservation> findRoomsInReservationByReservationId(@Param("id") Long id);
    List<RoomsInReservation> findByRoomId(@Param("id") Long id);

    public final static String FIND_ROOMSINRESERVATION_BY_RESERVATION_ID = "select distinct rir from RoomsInReservation rir " +
            "LEFT JOIN rir.reservation r " +
            "where r.id = :id ";
}
