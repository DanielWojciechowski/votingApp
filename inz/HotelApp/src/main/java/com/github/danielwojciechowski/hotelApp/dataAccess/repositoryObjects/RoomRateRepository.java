package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Room;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.RoomRate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@RepositoryRestResource
public interface RoomRateRepository extends CrudRepository<RoomRate, Long>{
	@Query(GET_STAY_VALUE)
	Double getReservationCost(@Param("roomNo") String roomNo,
									   @Param("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
									   @Param("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate);
	List<RoomRate> findRoomRateByRoomIdAndDateBetween(@Param("roomId") Long id,
										@Param("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
										@Param("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate);

	public final static String GET_STAY_VALUE = "select sum(rr.price) from RoomRate rr " +
			"LEFT JOIN rr.room r " +
			"where r.roomNo = :roomNo " +
			"and  rr.date between :startDate and :endDate";
}
