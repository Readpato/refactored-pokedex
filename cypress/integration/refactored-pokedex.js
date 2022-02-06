/// <reference types="cypress" />

const URL = "http://127.0.0.1:8080";

context("Pokedex", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Layout", () => {
    it("Make sure the layout has been loaded correctly", () => {
      cy.get(".navbar").should(
        "have.css",
        "background-color",
        "rgb(247, 159, 159)"
      );
      cy.get(".navbar img").should(
        "have.attr",
        "src",
        "src/images/pokeball.svg"
      );
      cy.get(".navbar a").should("contain", "Pokedex");
      cy.get(".pokemon-search-input").should(
        "have.attr",
        "placeholder",
        "Insert Pokemon Name"
      );
      cy.get(".pokemon-search-button").should("contain", "Search");
      cy.get(".initial-pokemon-card").should("exist").and("be.visible");
      cy.get(".initial-pokemon-card img").should(
        "have.attr",
        "src",
        "src/images/initial-pokemon-silhouette.png"
      );
      cy.get(".initial-pokemon-card h5").should("contain", "Select a Pokemon!");
      cy.get(".initial-pokemon-card li")
        .should("have.length", "1")
        .and("contain", "Find more about pokemon by clicking on their name.");
      cy.get(".pokemon-list .list-group-item ")
        .should("have.length", "20")
        .and("be.visible");
      cy.get(".pokemon-pagination")
        .should("be.visible")
        .and("contain", "Previous")
        .and("contain", "Next");
    });
  });
});
