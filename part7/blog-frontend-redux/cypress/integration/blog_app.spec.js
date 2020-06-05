describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testing user',
      username: 'tester',
      password: 'testersecret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
  })

  it('front page loads correctly', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('login page is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('testing logging in', function () {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester1')
      cy.get('#password').type('testersecret')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
        .should('have.css','color', 'rgb(255, 0, 0)')
        .and('have.css','border-style', 'solid')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('testersecret')
      cy.get('#login-button').click()

      cy.contains('Successful login')
        .should('have.css','color', 'rgb(0, 128, 0)')
        .and('have.css','border-style', 'solid')
    })
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({username: 'tester', password: 'testersecret'})
    })

    it('A blog post can be created and displayed correctly', function() {
      cy.createPost({
        author: 'cypress author',
        title: 'cypress title',
        url: 'http://cypressurl.com',
        likes: 10,
      })

      cy.contains('cypress author')
      cy.contains('cypress title')

      cy.get('.togglableContent')
        .should('have.css', 'display', 'none')
        .and('contain', 'http://cypressurl.com')
        .and('contain', '10')
        .and('contain', 'tester')
    })

    it('A post can be liked', function () {
      cy.createPost({
        author: 'cylike author',
        title: 'cylike title',
        url: 'http://cylikeurl.com',
        likes: 22,
      })

      cy.contains('cylike author').contains('view').click()
      cy.get('#like-button').click()
      cy.contains('23')
    })

    it('A post can be deleted', function() {
      cy.createPost({
        author: 'cydelete author',
        title: 'cydelete title',
        url: 'http://cydeleteurl.com',
        likes: 33,
      })

      cy.contains('cydelete author').contains('view').click()
      cy.get('#delete-button').click()
      cy.get('cydelete-author').should('not.exist')
      cy.contains('successfully deleted a post cydelete title')
    })

    it('A post cannot be deleted by non-creator', function() {
      cy.createPost({
        author: 'cy1 author',
        title: 'cy1 title',
        url: 'http://cy1.com',
        likes: 44,
      })
      cy.contains('cy1 author')

      cy.get('#logout-button').click()
      const user2 = {
        name: 'testing user 2',
        username: 'tester2',
        password: 'tester2secret'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user2)
      cy.login({username: 'tester2', password: 'tester2secret'})

      cy.contains('cy1 author').contains('view').click()
      cy.contains('cy1 author').get('#delete-button').click()

      cy.contains('Deletion failed')
      cy.contains('cy1 author')

      cy.get('#logout-button').click()
    })

    it('blogs are ordered by number of likes', function() {
      cy.createPost({
        author: 'author1',
        title: 'title1',
        url: 'http://cy1.com',
        likes: 11,
      })

      cy.createPost({
        author: 'author2',
        title: 'title2',
        url: 'http://cy2.com',
        likes: 12,
      })

      cy.createPost({
        author: 'author3',
        title: 'title3',
        url: 'http://cy3.com',
        likes: 55,
      })

      cy.createPost({
        author: 'author4',
        title: 'title4',
        url: 'http://cy4.com',
        likes: 100,
      })

      cy.get('author').then(posts => {
        var likes = posts.map(post => post.likes)
        cy.wrap(likes).should('equal', likes.sort((a, b) => (a.likes > b.likes) ? 1 : -1))
      })

    })
  })
})