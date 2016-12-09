Feature: User Login
  As a user
  I want my credentials to be recognised
  So I am authorized to use the application

  Scenario: At start up
    Given the user is registered
    And the user is on the login view at the start
    Then there are no error messages on the user login page

  Scenario:Login With no credentials
    Given the user tries to login without entering any credentials
    Then the user stays at the login view and see an error for missing credentials

  Scenario:Login With Incorrect Details
    Given the user login with invalid credentials
    Then the user stays at the login view and see an error for invalid credentials

  Scenario: Login With Correct Details
    Given the user login with valid credentials
    Then the user sees the home page

