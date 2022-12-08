const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
'use strict'
let token = " ";
let codBooking = 0;

Given("the user has an account", () => {

})

When("validate user credentials", (datatable) => {
    const url = `${Cypress.env('URL')}/auth`;
    cy.log(url);
    cy.log(datatable);
    datatable.hashes().forEach(row => {
        cy.log("Request body: " + JSON.stringify(row))
        cy.request({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                "username": row.username,
                "password": row.password
            },
        }).as("endpoint")
    })
})
Then("validate response code {string}", (statusCode) => {

    cy.get("@endpoint").then((response) => {
        expect(response.status).to.equal(Number(statusCode));

        almToken = (response.body);
        token = almToken.token;
        cy.log(token);
    });
})

//Scenario: List all ids bookings

Given("list ids", () => {
    cy.log("Hola estoy en el given")
})

When("show the list of ids", () => {
    const url = `${Cypress.env('URL')}/booking`;
    cy.request({
        method: "GET",
        url: url,
        headers: {
            "Content-type": "application/json",
        },

    }).as("endpoint");
    cy.get("@endpoint").then((response) => {
        //  cy.log(JSON.stringify(response.body));
    });
})

Then("validate response code booking {string}", (statusCode) => {
    cy.get("@endpoint").then((response) => {
        expect(response.status).to.equal(Number(statusCode));
    });
})

//Scenario: Show reservations

Given("there is list reservation", () => {

})

When("show booking information id = {string}", (codBookingid) => {

    const url = `${Cypress.env('URL')}/booking/${codBookingid}`;
    cy.request({
        method: 'GET',
        url: url,
        headers: {
            "Content-type": "application/json",
        },
    }).as("endpoint");
    cy.get("@endpoint").then((response) => {
        cy.log(JSON.stringify(response));
    })
})


//Scenario: Create new reservation
Given("the user has not created a reservation", () => {

})

When("register reservation data", (datatable) => {
    const url = `${Cypress.env('URL')}/booking`;
    datatable.hashes().forEach((row) => {
        cy.request({
            method: 'POST',
            url: url,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: {
                "firstname": row.firstname,
                "lastname": row.lastname,
                "totalprice": Number(row.totalprice),
                "depositpaid": Boolean(row.depositpaid),
                "bookingdates": {
                    "checkin": row.checkin,
                    "checkout": row.checkout
                },
                "additionalneeds": row.additionalneeds
            }
        }).as("endpoint");
        cy.get("@endpoint").then((response) => {
            arrayBookingid = (response.body)
            cy.log(`El id es: ${arrayBookingid.bookingid}`)
            codBooking=arrayBookingid.bookingid


        })
    })

})

//Scenario: Updates a current booking
Given("Que exista una reserva", () => {
    cy.log(almToken)
    cy.log(arrayBookingid.bookingid)
})

When("Actualizar datos de una reserva", (datatable) => {
    const url = `${Cypress.env('URL')}/booking/${codBooking}}`
    token = almToken.token;
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "PUT",
            url: url,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            body: {
                "firstname": row.firstname,
                "lastname": row.lastname,
                "totalprice": row.totalprice,
                "depositpaid": row.depositpaid,
                "bookingdates": {
                    "checkin": row.checkin,
                    "checkout": row.checkout
                },
                "additionalneeds": row.additionalneeds
            }
        }).as("endpoint");
        cy.get("@endpoint").then((response) => {
            cy.log(JSON.stringify(response.body));
        })
    })

})

//Scenario: Partial Update Booking

When("Actualizar algunos datos de una reserva", (datatable) => {
    const url = `${Cypress.env('URL')}/booking/${codBooking}`;
    datatable.hashes().forEach((row) => {
        cy.request({
            method:"PATCH",
            url:url,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            body: {
                "firstname": row.firstname,
                "lastname": row.lastname
            }
        }).as("endpoint");
    })

})

Then("Mostrar reserva actualizada parcialmente", () => {
    cy.get("@endpoint").then((response)=>{
        cy.log(JSON.stringify(response.body))
    })
 })

// Scenario: Delete booking
/* Given("Que exista una reserva", () => {

})*/

When("Eliminar una reserva", () => {
    const url=`${Cypress.env('URL')}/booking/${arrayBookingid.bookingid}`
    cy.request({
        method:"DELETE",
        url:url,
        headers:{
            "Cookie":`token=${token}`
        }
    }).as("endpoint")
})
Then("Mostrar reserva eliminada",()=>{
    cy.get("@endpoint").then((response)=>{
        cy.log(response.codBooking)
        cy.log("La reserva ha sido eliminada")
    })
})


// Scenario: Ping - HealthCheck
Given("Que exista la api", () => {

})

When("Que funcione la api", () => {
    const url=`${Cypress.env('URL')}/ping`
    cy.request({
        method:'GET',
        url:url,
    }).as("endpoint")
})

Then("Validar condigo de respuesta {string}", () => {

})




