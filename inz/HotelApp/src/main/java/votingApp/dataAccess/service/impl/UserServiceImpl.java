package votingApp.dataAccess.service.impl;

import org.springframework.stereotype.Service;
import votingApp.dataAccess.pojo.User;
import votingApp.dataAccess.repository.UserRepository;
import votingApp.dataAccess.service.UserService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Inject
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> listAll() {
        return repository.findAll();
    }

    @Override
    public User findByPhoneNumber(String phoneNumber) {
        List<User> users = repository.findByPhoneNumber(phoneNumber);
        System.out.println(users.isEmpty() ? "There is no User with phoneNumber="+phoneNumber : "Found User: " + users.get(0).getFirstName());

        return users.isEmpty() ? null : users.get(0);
    }

    @Transactional
    @Override
    public User registerNew(User user) {
        User newUser = repository.save(user);
        System.out.println("New User registred with id=" + newUser.getId());
        return newUser;
    }
}
