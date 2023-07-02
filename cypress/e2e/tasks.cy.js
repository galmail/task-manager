/// <reference types="cypress" />

describe("/tasks", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should redirect to /tasks", () => {
    cy.location("pathname").should("equal", "/tasks");
  });

  it("displays 5 tasks by default", () => {
    cy.get(".task-list .task-item").should("have.length.greaterThan", 0);
  });

  it("should open task details when clicked on a task", () => {
    cy.get(".task-list .task-item").first().click();
    cy.location("pathname").should("equal", "/tasks/1");
  });

  it("should be able to delete a task and get redirected back to tasks", () => {
    cy.get(".task-list")
      .find(".task-item")
      .then((list) => list.length)
      .then((numTasks) => {
        cy.get(".task-list .task-item").first().click();
        cy.get("button[data-testid=delete-button]").click();
        cy.location("pathname").should("equal", "/tasks");
        cy.get(".task-list .task-item").should("have.length", numTasks - 1);
      });
  });
});
