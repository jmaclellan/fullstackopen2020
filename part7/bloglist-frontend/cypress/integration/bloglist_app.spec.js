describe('Blog list app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Tiger Woods',
      username: 'twoods',
      password: 'password123'
    })
    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Test',
      username: 'Test',
      password: 'testpassword'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('Login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('twoods')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()

      cy.contains('Tiger Woods logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('twoods')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username/password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'twoods', password: 'password123' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('Dan Abramov')
      cy.get('#title').type('random blog post')
      cy.get('#url').type('example.com')
      cy.get('#create').click()

      cy.contains('random blog post')
      cy.contains('Dan Abramov')
    })
  })

  describe('When several blogs creaded by many people exist', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
      cy.createBlog({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })
      cy.contains('logout').click()
      cy.login({ username: 'Test', password: 'password' })
      cy.createBlog({ author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' })

      cy.contains('test1').parent().parent().as('blog1')
      cy.contains('test2').parent().parent().as('blog2')
      cy.contains('test3').parent().parent().as('blog3')
    })

    it('Blogs can be liked', function() {
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('likes 1')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes 3')
        cy.wrap(blogs[1]).contains('likes 2')
        cy.wrap(blogs[2]).contains('likes 1')
      })
    })

    it('The creator can delete a blog', function() {
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('remove').click()
      cy.get('home').should('not.contain', 'test3')

      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').should('not.contain', 'remove')
    })
  })

})