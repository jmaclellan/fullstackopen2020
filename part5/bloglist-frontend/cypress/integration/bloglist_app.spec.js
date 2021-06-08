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
      cy.contains('login').click()
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

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ name: 'Joe Smith', url: 'test123.com', likes: 1, title: 'Bloggy McBlogface' })
        cy.createBlog({ name: 'John Wayne', url: 'wayneindustries.com', likes: 12, title: 'John Wayne stuff' })
        cy.createBlog({ name: 'Tom Brady', url: 'tb12.com', likes: 55, title: 'TB 12 Method'})
      })

      it('it can be made important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button').should('contain', 'make not important')
      })
    })
  })
})