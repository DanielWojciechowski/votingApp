package com.github.danielwojciechowski.hotelApp.dataAccess.pojo;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;	
	
	private String firstName;
	private String lastName;
	private String email;
	private String idNumber;
	private String phoneNumber;
	private String sex;
	private String preferences;

	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	@JoinColumn(name="countryId")
	private DictCountry country;
}
