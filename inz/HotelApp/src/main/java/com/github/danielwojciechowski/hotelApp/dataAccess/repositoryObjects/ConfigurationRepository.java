package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Configuration;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.DictRoomType;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ConfigurationRepository extends CrudRepository<Configuration, Long> {
    List<Configuration> findByName(@Param("name") String name);
}
