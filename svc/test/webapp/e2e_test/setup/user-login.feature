Feature: Login
  As a user
  I want my credentials to be recognised
  So I am authorized to use the application

  Scenario: Login With Correct Details
    Given the user is registered
    And the user is on the login view at the start
    And the user login with valid credentials
    Then the user sees the home page

