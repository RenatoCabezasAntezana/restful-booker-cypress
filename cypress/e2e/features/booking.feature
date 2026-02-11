Feature: Testing to the bookings service

  @SB-55 @regression
  Scenario: successful access
    Given the user has an account
    When validate user credentials
      | username | password    |
      | admin    | password123 |
    Then validate response code "200"

  @SB-56 @regression
  Scenario: List all ids bookings
    Given list ids
    When show the list of ids
    Then validate response code booking "200"

  @SB-57 @regression
  Scenario: Show reservations
    Given there is list reservation
    When show booking information id = "65033"
    Then validate response code booking "200"


  @SB-58 @regression
  Scenario: Create new reservation
    Given the user has not created a reservation
    When register reservation data
      | firstname | lastname | totalprice | depositpaid | checkin    | checkout   | additionalneeds |
      | Renato    | Cubas    | 111        | true        | 2018-01-01 | 2019-01-01 | Breakfast       |
    Then validate response code booking "200"

  @regression
  Scenario: Updates a current booking
    Given Que exista una reserva
    When Actualizar datos de una reserva
      | firstname | lastname | totalprice | depositpaid | checkin    | checkout   | additionalneeds |
      | wELSER    | Cubas    | 120        | true        | 2018-01-01 | 2019-01-01 | Breakfast       |
    Then Validar condigo de respuesta "200"
  
  @regression
  Scenario: Partial Update Booking
    Given Que exista una reserva
    When Actualizar algunos datos de una reserva
      | firstname | lastname |
      | Renato    | Cabezas  |
    Then Validar condigo de respuesta "200"
    And Mostrar reserva actualizada parcialmente

  @regression
  Scenario: Delete booking
    Given Que exista una reserva
    When Eliminar una reserva
    Then Validar condigo de respuesta "201"
    Then Mostrar reserva eliminada

  @regression
  Scenario: Ping - HealthCheck
    Given Que exista la api
    When Que funcione la api
    Then Validar condigo de respuesta "201"



