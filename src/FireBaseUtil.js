import firebase from 'firebase'
require('firebase/database')
export default class {
  firebase = {}
  database = {}
  constructor (firebase) {
    this.firebase = firebase
    this.database = firebase.database
  }

  async getLoggedinUser () {
    const user = await new Promise(resolve =>
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user)
      })).then((user_) => {
      return user_
    }).catch(error => console.error(error))
    return user
  }

  async getUserData (path) {
    const data = await new Promise((resolve) => {
      this.database().ref(path).on('value', (snapshot) => {
        resolve(snapshot.val())
      })
    }).then((value) => {
      return value
    }).catch(error => console.error(error))
    return data
  }

  setUserData (path, data) {
    this.database().ref(path).set(data, (error) => {
      if (error) {
        console.log(error)
        return error
      } else {
        return true
      }
    })
  }

  log () {
    console.log('log')
  }
}
