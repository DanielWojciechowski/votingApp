package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Client;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.DictRoomType;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface DictRoomTypeRepository extends CrudRepository<DictRoomType, Long> {

    @Query(FIND_ROOMTYPE_BY_ROOM_ID)
    List<DictRoomType> findRoomTypeByRoomId(@Param("id") Long id);
    public final static String FIND_ROOMTYPE_BY_ROOM_ID = "select distinct rt from Room r " +
            "LEFT JOIN r.roomType rt " +
            "where r.id = :id ";
}
