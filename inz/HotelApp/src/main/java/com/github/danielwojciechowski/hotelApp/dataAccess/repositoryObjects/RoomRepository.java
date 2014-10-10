package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Room;

@RepositoryRestResource
public interface RoomRepository extends CrudRepository<Room, Long>{
	
	List<Room> findByRoomNoStartingWith(@Param("roomNo") String roomNo);

}
