package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;

import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Client;
import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.DictDepartment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface DictDepartmentRepository extends CrudRepository<DictDepartment, Long> {
	@Query(FIND_DEPARTMENTS_FOR_ORDER)
	List<DictDepartment> findDepartmentsForOrder();

	@Query(FIND_EMPLOYEE_DEPARTMENT)
	List<DictDepartment> findEmployeeDepartment(@Param("id") Long id);


	public final static String FIND_DEPARTMENTS_FOR_ORDER = "select distinct d from DictDepartment d " +
			"where d.name = 'Dział Techniczny' or d.name = 'Obsługa Pokojowa'";

	public final static String FIND_EMPLOYEE_DEPARTMENT = "select distinct d from Employee e " +
			"LEFT JOIN e.department d "+
			"where e.id = :id";
}
