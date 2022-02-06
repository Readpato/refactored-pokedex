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
  describe("Functionality", () => {
    it("Search a Pokemon and display its information", () => {
      cy.get(".pokemon-search-input").type("onix");
      cy.get(".pokemon-search-button").click();
      cy.get(".initial-pokemon-card").should("not.be.visible");
      cy.get(".pokemon-list").should("not.be.visible");
      cy.get(".pokemon-pagination").should("not.be.visible");
      cy.get(".homepage-button").should("be.visible");
      cy.get(".pokemon-card").should("have.length", "1");
      cy.get(".pokemon-card h5").should("contain", "Onix");
      cy.get(".pokemon-description li").should("have.length", "5");
      cy.get(".pokemon-description li").eq(0).should("contain", "Number: 95");
      cy.get(".pokemon-description li")
        .eq(1)
        .should("contain", "Type: Rock - Ground");
      cy.get(".pokemon-description li")
        .eq(2)
        .should("contain", "Abilities: Rock-head, Sturdy, Weak-armor");
      cy.get(".pokemon-description li").eq(3).should("contain", "Weight: 2100");
      cy.get(".pokemon-description li").eq(4).should("contain", "Height: 88");
    });
    it("Return to homepage and search a non existing Pokemon", () => {
      cy.get(".homepage-button").click();
      cy.get(".initial-pokemon-card").should("be.visible");
      cy.get(".pokemon-list").should("be.visible");
      cy.get(".pokemon-pagination").should("be.visible");
      cy.get(".homepage-button").should("not.be.visible");
      cy.get(".pokemon-search-input").clear().type("onixx");
      cy.get(".pokemon-search-button").click();
      cy.get(".initial-pokemon-card").should("not.be.visible");
      cy.get(".pokemon-list").should("not.be.visible");
      cy.get(".pokemon-pagination").should("not.be.visible");
      cy.get(".homepage-button").should("be.visible");
      cy.get(".error-pokemon-card").should("be.visible");
      cy.get(".error-pokemon-card h5").should("contain", "Uh-oh! Error!");
      cy.get(".error-pokemon-description li").should("have.length", "2");
      cy.get(".error-pokemon-description li")
        .eq(0)
        .should("contain", "Number: 404");
      cy.get(".error-pokemon-description li")
        .eq(1)
        .should("contain", "That Pokemon doesn't exist. Try again.");
    });
    it("Search a long Pokemon name", () => {
      cy.get(".pokemon-search-input")
        .clear()
        .type("onixxonixxonixxonixxonixxonixxonixx");
      cy.get(".pokemon-search-button").click();
      cy.get(".initial-pokemon-card").should("not.be.visible");
      cy.get(".pokemon-list").should("not.be.visible");
      cy.get(".pokemon-pagination").should("not.be.visible");
      cy.get(".homepage-button").should("be.visible");
      cy.get(".error-pokemon-card").should("be.visible");
      cy.get(".error-pokemon-card h5").should("contain", "Uh-oh! Error!");
      cy.get(".error-pokemon-description li").should("have.length", "2");
      cy.get(".error-pokemon-description li")
        .eq(0)
        .should("contain", "Number: 404");
      cy.get(".error-pokemon-description li")
        .eq(1)
        .should("contain", "The Pokemon name is too long.");
    });
    it("Search an invalid Pokemon Name", () => {
      cy.get(".pokemon-search-input").clear().type("0nix");
      cy.get(".pokemon-search-button").click();
      cy.get(".initial-pokemon-card").should("not.be.visible");
      cy.get(".pokemon-list").should("not.be.visible");
      cy.get(".pokemon-pagination").should("not.be.visible");
      cy.get(".homepage-button").should("be.visible");
      cy.get(".error-pokemon-card").should("be.visible");
      cy.get(".error-pokemon-card h5").should("contain", "Uh-oh! Error!");
      cy.get(".error-pokemon-description li").should("have.length", "2");
      cy.get(".error-pokemon-description li")
        .eq(0)
        .should("contain", "Number: 404");
      cy.get(".error-pokemon-description li")
        .eq(1)
        .should("contain", "The Pokemon name has invalid characters.");
    });
    it("Search an empty Pokemon Name", () => {
      cy.get(".pokemon-search-input").clear();
      cy.get(".pokemon-search-button").click();
      cy.get(".initial-pokemon-card").should("not.be.visible");
      cy.get(".pokemon-list").should("not.be.visible");
      cy.get(".pokemon-pagination").should("not.be.visible");
      cy.get(".homepage-button").should("be.visible");
      cy.get(".error-pokemon-card").should("be.visible");
      cy.get(".error-pokemon-card h5").should("contain", "Uh-oh! Error!");
      cy.get(".error-pokemon-description li").should("have.length", "2");
      cy.get(".error-pokemon-description li")
        .eq(0)
        .should("contain", "Number: 404");
      cy.get(".error-pokemon-description li")
        .eq(1)
        .should("contain", "The Pokemon name has invalid characters.");
    });
    it("Return to homepage and select a Pokemon from the list", () => {
      cy.get(".homepage-button").click();
      cy.get(".initial-pokemon-card").should("be.visible");
      cy.get(".pokemon-list").should("be.visible");
      cy.get(".pokemon-pagination").should("be.visible");
      cy.get(".homepage-button").should("not.be.visible");
      cy.get(".list-group-item").eq(0).click();
      cy.get(".initial-pokemon-card").should("not.be.visible");
      cy.get(".pokemon-list").should("be.visible");
      cy.get(".pokemon-pagination").should("be.visible");
      cy.get(".pokemon-card").should("be.visible");
      cy.get(".pokemon-card h5").should("contain", "Bulbasaur");
      cy.get(".pokemon-description li").should("have.length", "5");
      cy.get(".pokemon-description li").eq(0).should("contain", "Number: 1");
      cy.get(".pokemon-description li")
        .eq(1)
        .should("contain", "Type: Grass - Poison");
      cy.get(".pokemon-description li")
        .eq(2)
        .should("contain", "Abilities: Overgrow, Chlorophyll");
      cy.get(".pokemon-description li").eq(3).should("contain", "Weight: 69");
      cy.get(".pokemon-description li").eq(4).should("contain", "Height: 7");
    });
  });
});
