package com.dev.bee_manegement_system.controlles.errors;

public class UsernameAlreadyUsedException extends Error {

    public UsernameAlreadyUsedException() {
        super("Login name already used!");
    }
}
