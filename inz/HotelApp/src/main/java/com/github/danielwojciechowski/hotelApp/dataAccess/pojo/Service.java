package com.github.danielwojciechowski.hotelApp.dataAccess.pojo;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Service {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(unique=true)
	private String name;
	@Column(unique=true)
	private String code;

	private double price;
}
