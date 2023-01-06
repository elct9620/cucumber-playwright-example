Feature: Home Page
  Scenario: I can see esbuild server
    When I visit "/"
    Then I can see the title "Local Server"

  Scenario: I can see "Hello World" in local server
    When I visit "/"
    Then I can see "Hello World"
