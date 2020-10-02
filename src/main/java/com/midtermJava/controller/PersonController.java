package com.midtermJava.controller;

import com.midtermJava.entity.Person;
import com.midtermJava.repository.PersonRepository;
import com.midtermJava.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class PersonController {

    protected PersonService personService;

    @GetMapping("/api/v2/users/")
    public ResponseEntity<?> getPersons(){
        return ResponseEntity.ok ( personService.findAll() );
    }
    @PutMapping("/api/v2/users/")
    public ResponseEntity<?> updatePerson(@RequestBody Person person){
        return ResponseEntity.ok ( personService.update( person ) );
    }
    @PostMapping("/api/v2/users/")
    public ResponseEntity<?> savePerson(@RequestBody Person person){
        return ResponseEntity.ok ( personService.create( person ) );
    }
    @DeleteMapping("/api/v2/users/{id}")
    public void deletePerson(@PathVariable Long id){
        personService.delete ( id );
    }
}
