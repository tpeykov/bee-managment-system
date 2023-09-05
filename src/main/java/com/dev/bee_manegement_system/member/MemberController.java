package com.dev.bee_manegement_system.member;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/members")
public class MemberController {
    @GetMapping
    public List<Member> getAllMembers(){
        List<Member> members = Arrays.asList(
                new Member(
                        1L,
                        "Trayan",
                        "ter4it@gmail.com",
                        Type.External_Member),
                new Member(
                        2L,
                        "Mariyan",
                        "mariyan@gmail.com",
                        Type.Member_Of_The_Menagement_Board)
        );
        return members;
    }
}
