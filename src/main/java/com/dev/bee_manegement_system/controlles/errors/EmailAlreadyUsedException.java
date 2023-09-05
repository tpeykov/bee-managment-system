package com.dev.bee_manegement_system.controlles.errors;

public class EmailAlreadyUsedException extends Error {

    public EmailAlreadyUsedException() {
        super("User with that email already exists!");
    }
}
