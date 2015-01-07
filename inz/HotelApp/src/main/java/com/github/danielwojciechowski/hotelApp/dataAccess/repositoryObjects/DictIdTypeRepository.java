package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.DictIdType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DictIdTypeRepository extends CrudRepository<DictIdType, Long> {

}
