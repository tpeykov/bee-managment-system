insert into authority(id, name) values(1, 'ROLE_ADMIN'),(2, 'ROLE_MANUFACTURER'), (3, 'ROLE_MERCHANT');


-- INSERT USER WITH MANUFACTURER ROLE
INSERT INTO user (uuid, username, uic, email, password)
VALUES (nextval('user_uuid_sequence'), 'beess-company', 'UIIC1', 'beess-company@company.com', '$2a$10$Olmoy4Oj5cqkHfpXOy7/D.8aSC6yw2Ujx7/4mbl9ynGX2TSbVkOIC');

INSERT INTO user_authority (user_uuid, authority_name)
VALUES (currval('user_uuid_sequence'), 'ROLE_MANUFACTURER');


-- INSERT USER WITH MERCHANT ROLE
INSERT INTO user (uuid, username, uic, email, password)
VALUES (nextval('user_uuid_sequence'), 'merchant', 'UI', 'merchant@company.com', '$2a$10$Olmoy4Oj5cqkHfpXOy7/D.8aSC6yw2Ujx7/4mbl9ynGX2TSbVkOIC');

INSERT INTO user_authority (user_uuid, authority_name)
VALUES (currval('user_uuid_sequence'), 'ROLE_MERCHANT');