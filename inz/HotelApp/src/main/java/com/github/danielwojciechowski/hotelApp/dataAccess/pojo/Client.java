package com.github.danielwojciechowski.hotelApp.dataAccess.pojo;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String firstName;
	private String lastName;
	private String email;
	private String idNumber;
	private String phoneNumber;
	private String sex;
	private String preferences;

	@Column(unique=true)
	private String pesel;

	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	@JoinColumn(name="countryId")
	private DictCountry country;

	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	@JoinColumn(name="idTypeId")
	private DictIdType idType;
}
