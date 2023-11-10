const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Blogging Platform API Tests', () => {
  describe('Authentication', () => {
    it('should register a new user', async () => {
      const res = await chai.request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'testuser@example.com', password: 'testpassword' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });

    it('should log in a user and return a JWT token', async () => {
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send({ email: 'testuser@example.com', password: 'testpassword' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });
  });

  // User Tests
  describe('User Operations', () => {
    it('should update user profile', async () => {
      const res = await chai.request(app)
        .put('/api/users/profile')
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN') 
        .send({ bio: 'New bio' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });

    it('should follow a user', async () => {
      const userId = 'UserId';

      const res = await chai.request(app)
        .post(`/api/users/follow/${userId}`)
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN'); 

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });

    it('should retrieve the user feed', async () => {
      const res = await chai.request(app)
        .get('/api/users/feed')
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN'); 

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
      expect(res.body).to.have.property('feed');
    });
  });

  // Post Tests
  describe('Post Operations', () => {
    it('should create a new post', async () => {
      const post = { title: 'Test Post', content: 'This is a test post.' };

      const res = await chai.request(app)
        .post('/api/posts')
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN') 
        .send(post);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });

    it('should update a post', async () => {
      const postId = 'PostId';

      const res = await chai.request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN') 
        .send({ title: 'Updated Post', content: 'This post has been updated.' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });

    it('should delete a post', async () => {
      const postId = 'PostId';

      const res = await chai.request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN');

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });
  });

  describe('Search Module', () => {
    it('should search posts based on keywords', async () => {
      const res = await chai.request(app)
        .get('/api/search/posts')
        .query({ keyword: 'test' }) 
        .set('Authorization', 'Bearer YOUR_JWT_TOKEN'); 

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
      expect(res.body).to.have.property('posts');
    });

  });

  describe('Admin Operations', () => {
    // Test case for viewing all users
    it('should view all users', async () => {
      const res = await chai.request(app)
        .get('/api/admin/users')
        .set('Authorization', 'Bearer YOUR_ADMIN_JWT_TOKEN'); // Replace with a valid admin JWT token

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
      expect(res.body).to.have.property('users');
    });

    // Test case for blocking a user
    it('should block a user', async () => {
      const userId = 'UserId';

      const res = await chai.request(app)
        .put(`/api/admin/users/${userId}/block`)
        .set('Authorization', 'Bearer YOUR_ADMIN_JWT_TOKEN'); 

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });

    // Test case for viewing all blog posts
    it('should view all blog posts', async () => {
      const res = await chai.request(app)
        .get('/api/admin/posts')
        .set('Authorization', 'Bearer YOUR_ADMIN_JWT_TOKEN'); 

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
      expect(res.body).to.have.property('posts');
    });

    it('should disable a post', async () => {
      const postId = 'somePostId';

      const res = await chai.request(app)
        .put(`/api/admin/posts/${postId}/disable`)
        .set('Authorization', 'Bearer YOUR_ADMIN_JWT_TOKEN'); 
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.include('successfully');
    });
  });
});
