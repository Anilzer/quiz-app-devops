
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Questions } from "../questions_cicd.js";

// Test 1 : le quiz contient des questions
test("Le quiz contient des questions", () => {
  assert.ok(Array.isArray(Questions));
  assert.ok(Questions.length > 0);
});

// Test 2 : chaque question possède un énoncé
test("Chaque question possède un énoncé valide", () => {
  for (const question of Questions) {
    assert.equal(typeof question.question, "string");
    assert.ok(question.question.trim().length > 0);
  }
});

// Test 3 : chaque question propose plusieurs réponses
test("Chaque question possède plusieurs réponses", () => {
  for (const question of Questions) {
    assert.ok(Array.isArray(question.answers));
    assert.ok(question.answers.length >= 2);

    for (const answer of question.answers) {
      assert.equal(typeof answer, "string");
      assert.ok(answer.trim().length > 0);
    }
  }
});

// Test 4 : la bonne réponse existe parmi les choix
test("La bonne réponse figure parmi les propositions", () => {
  for (const question of Questions) {
    assert.ok(
      question.answers.includes(question.correct),
      `Réponse correcte introuvable : ${question.question}`
    );
  }
});

// Test 5 : aucun doublon de question
test("Les questions sont uniques", () => {
  const titles = Questions.map(q => q.question.trim());
  assert.equal(new Set(titles).size, titles.length);
});

// Test 6 : les réponses proposées sont uniques
test("Chaque question possède des réponses distinctes", () => {
  for (const question of Questions) {
    assert.equal(
      new Set(question.answers).size,
      question.answers.length,
      `Réponses en doublon : ${question.question}`
    );
  }
});

// Test 7 : l'interface contient ses éléments essentiels
test("La page HTML initialise correctement le quiz", () => {
  const html = readFileSync(
    new URL("../index.html", import.meta.url),
    "utf8"
  );

  assert.match(html, /id=["']app["']/);
  assert.match(html, /id=["']start["']/);
  assert.match(html, /main\.js/);
});
