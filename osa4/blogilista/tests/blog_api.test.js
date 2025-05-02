const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { strictEqual } = require('node:assert')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
      
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    }) 

    describe('viewing a specific blog', () => {
        test('succeeds with a valid id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToView = blogsAtStart[0]

            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(resultBlog.body, blogToView)
        })
    })

    describe('addition of a new blog', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                title: 'Lukujonossa',
                author: 'Sanna Ruoho',
                url: 'https://lukujonossa.fi/',
                likes: 3
            }
    
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
            const titles = blogsAtEnd.map(b => b.title)
            assert(titles.includes('Lukujonossa'))
        })

        test('adds likes to 0 if likes are not defined', async () => {
            const newBlog = { title: 'Kinuskikissa', author: 'Kinuskikissa', url: 'https://kinuskikissa.fi' }
      
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            const blog = blogsAtEnd.find(b => b.title === 'Kinuskikissa')
            assert.strictEqual(blog.likes, 0)
        })

        test('fails with status code 400 if there is no title', async () => {
            const newBlog = { author: 'Heta Puro', url: 'https://google.com' }
      
            await api.post('/api/blogs').send(newBlog).expect(400)
      
            const blogsAtEnd = await helper.blogsInDb()
      
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })

        test('fails with status code 400 if there is no url', async () => {
            const newBlog = { title: 'Profile', author: 'Heta Puro' }
      
            await api.post('/api/blogs').send(newBlog).expect(400)
      
            const blogsAtEnd = await helper.blogsInDb()
      
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToDelete = blogsAtStart[0]
    
          await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    
          const blogsAtEnd = await helper.blogsInDb()
    
          const titles = blogsAtEnd.map(b => b.title)
          assert(!titles.includes(blogToDelete.title))
    
          assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        })
      })
})

after(async () => {
  await mongoose.connection.close()
})