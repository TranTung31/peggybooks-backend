/* eslint-disable no-useless-catch */
const createUser = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody,
      avatar: ''
    }
    delete newUser.confirmPassword
    return newUser
  } catch (error) {
    throw error
  }
}

export const userService = {
  createUser
}