Feature: Admin Login
  As a admin
  I want my credentials to be recognised
  So I am authorized to use the application

  Scenario: At start up
    Given the admin is registered
    And the admin is on the admin login page
    Then There are no error messages on the admin login page

  Scenario:Login With no credentials
    Given the admin tries to login without entering any credentials
    Then the admin stay at the login view and see an error for missing credentials

  Scenario:Login With Incorrect Details
    Given admin login with invalid credentials
    Then admin stay at the login view and see an error for invalid credentials

  Scenario: Login With Correct Details
    Given admin login with valid credentials
    Then admin sees the home page

