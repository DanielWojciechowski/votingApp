package com.github.danielwojciechowski.hotelApp.dataAccess.repositoryObjects;


import com.github.danielwojciechowski.hotelApp.dataAccess.pojo.Account;

import java.util.List;

public interface AccountRepository {
    public List<Account> findAllAccounts();
    public Account findAccount(Long id);
    public Account findAccountByName(String name);
    public Account createAccount(Account data);
}