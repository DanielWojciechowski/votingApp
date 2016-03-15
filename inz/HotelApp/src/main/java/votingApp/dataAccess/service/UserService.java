package votingApp.dataAccess.service;

import org.springframework.stereotype.Service;
import votingApp.dataAccess.pojo.User;

import java.util.List;

@Service
public interface UserService {

    List<User> listAll();

    User findByPhoneNumber(String phoneNumber);

    User registerNew(User user);
}
