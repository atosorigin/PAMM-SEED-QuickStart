Feature: Login
  As a user
  I want my credentials to be recognised
  So I am authorized to use the application

  Scenario: Login With Correct Details
    Given the admin is registered
    And the admin is on the admin login page
    And admin login with valid credentials
    Then admin sees the home page
