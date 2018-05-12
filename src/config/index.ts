export const config = {

  server: {
    port: 3000,
    path: {
      api: '../build/router'
    }
  },
  db: {
    name: 'simplechat',
    uri: 'mongodb://localhost:27017/simplechat',
    collections: {
      users: 'users',
      conversation: 'conversation'
    }
  }

};
