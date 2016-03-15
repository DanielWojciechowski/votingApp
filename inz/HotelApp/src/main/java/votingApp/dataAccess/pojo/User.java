package votingApp.dataAccess.pojo;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String firstName;

	@Column(unique=true)
	private String phoneNumber;

	public User() {
	}

	public User(String name, String number) {
		firstName = name;
		phoneNumber = number;
	}
}
