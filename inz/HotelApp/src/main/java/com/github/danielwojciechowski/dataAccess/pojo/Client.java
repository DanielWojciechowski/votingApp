package com.github.danielwojciechowski.dataAccess.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String id;	
	
	private String firtName;
	private String lastName;
	private String email;
	private String pesel;
	private String phoneNumber;
	private String sex;

}
