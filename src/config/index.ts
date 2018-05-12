export const config = {

  server: {
    port: 3000,
    path: {
      api: '../build/router'
    }
  },
  websocket: {
    port: 3001
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
