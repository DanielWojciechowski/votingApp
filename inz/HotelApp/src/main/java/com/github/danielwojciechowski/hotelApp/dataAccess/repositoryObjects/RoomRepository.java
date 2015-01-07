package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import java.util.Date;
import java.util.List;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.RoomsInReservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Room;
import org.springframework.format.annotation.DateTimeFormat;

@RepositoryRestResource
public interface RoomRepository extends CrudRepository<Room, Long>{
	List<Room> findByRoomNoStartingWith(@Param("roomNo") String roomNo);
	@Query(FIND_NOT_RESERVED_ROOMS)
	List<Room> findAvailableByRoomType(@Param("roomType") String roomType,
									   @Param("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
									   @Param("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate);
	@Query(FIND_ROOM_BY_ROOMSINRESERVATION_ID)
	List<Room> findRoomByRoomsInReservationId(@Param("id") Long id);

	public final static String FIND_NOT_RESERVED_ROOMS = "select distinct r from RoomsInReservation rir " +
			"LEFT JOIN rir.room r " +
			"LEFT JOIN r.roomType rt " +
			"LEFT JOIN rir.reservation res " +
			"where rt.roomType = :roomType " +
			"and (res.startDate is null " +
			"or res.startDate not between :startDate and :endDate) " +
			"and (res.endDate is null " +
			"or res.endDate not between :startDate and :endDate) ";

	public final static String FIND_ROOM_BY_ROOMSINRESERVATION_ID = "select distinct r from RoomsInReservation rir " +
			"LEFT JOIN rir.room r " +
			"where rir.id = :id ";
}
