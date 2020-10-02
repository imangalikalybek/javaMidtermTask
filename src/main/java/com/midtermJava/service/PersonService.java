package com.midtermJava.service;

import com.midtermJava.entity.Person;
import com.midtermJava.repository.PersonRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class PersonService {
    protected PersonRepository personRepository;
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public Person create(Person person) {
        return personRepository.save(person);
    }
    public Person update(Person person) {
        return personRepository.save(person);
    }
    public void delete(Long id){
        personRepository.deleteById(id);
    }
}
