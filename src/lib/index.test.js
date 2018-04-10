import * as lib from './index'

import localforage from 'localforage'

jest.mock('localforage')

describe('User management', () => {
  /* TODO: Write a real test */
  it('should create a user', () => {
    lib.createUser({
      username: 'some username',
      firstname: 'John',
      lastname: 'Doe',
      image: ''
    })

    expect(localforage.getItem).toBeCalledWith('userList')
  })
})
