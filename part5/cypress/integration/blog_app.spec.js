/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      name: 'test name',
      username: 'test',
      blogs: [],
      password: 'testpass',
    };
    const user2 = {
      name: 'test name 2',
      username: 'test2',
      blogs: [],
      password: 'testpass2',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user1);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('http://localhost:3000');
  });
  it('login form shown by default', function () {
    cy.contains('Login to application');
  });
  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('tt');
      cy.get('#password').type('tt');
      cy.get('#submit').click();
      cy.get('.notification').contains('invalid username or password');
    });
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test');
      cy.get('#password').type('testpass');
      cy.get('#submit').click();
      cy.get('.notification').contains('Logged in successfully');
      cy.contains('test name logged in');
    });
  });
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'testpass' });
    });
    it('can create a new blog', function () {
      cy.contains('Create new Blog').click();
      cy.get('#title').type('test title');
      cy.get('#url').type('test@test.com');
      cy.get('#create-note').click();
      cy.contains('Blog added successfully: test title');
    });
    describe('When blog list is populated', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'test title 1', url: 'test1@test.com' });
      });
      it('Can like a blog post', function () {
        cy.contains('View').click();
        cy.get('#like-div-1').contains('Likes: 0');
        cy.get('#like-button-1').click();
        cy.get('#like-div-1').contains('Likes: 1');
      });
      it('Another user cannot delete blog', function () {
        //logout current user
        cy.get('#logout-button').click();
        //login with other user
        cy.get('#username').type('test2');
        cy.get('#password').type('testpass2');
        cy.get('#submit').click();
        //see blog
        cy.contains('View').click();
        //click remove
        cy.get('#remove-button').click();
        cy.on('window:confirm', () => true);
        cy.contains('user mismatch/operation not permitted');
      });
      it('User can delete blog', function () {
        cy.contains('View').click();
        //click remove
        cy.get('#remove-button').click();
        cy.on('window:confirm', () => true);
        cy.get('#blog-list').should('not.contain', 'test title 1');
        cy.get('#blog-list').children().should('have.length', 0);
      });
      describe('Blogs are sorted according to likes in descending order', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'test title 2', url: 'test2@test.com' });
          cy.createBlog({ title: 'test title 3', url: 'test3@test.com' });
        });
        it('Blogs are sorted according to likes in descending order', function () {
          cy.contains('test title 1')
            .parent()
            .parent()
            .contains('View')
            .click();
          cy.get('#like-button-1').click();
          cy.wait(1000);
          cy.get('#like-button-1').click();
          cy.wait(1000);
          cy.contains('test title 3')
            .parent()
            .parent()
            .contains('View')
            .click();
          cy.get('#like-button-3').click();
          cy.wait(1000);
          // expected order 1, 3, 2
          cy.get('.blogTitle').then((b) => {
            expect(b[0]).to.contain('test title 1');
            expect(b[1]).to.contain('test title 3');
            expect(b[2]).to.contain('test title 2');
          });
        });
      });
    });
  });
});
