// store.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import appConfig from '../../app.config'

Vue.use(Vuex)

// the root, initial state object
const state = {
  hosts: [],
  model: {
    id: 0,
    host: '',
    userName: '',
    pwd: '',
    description: '',
    domain: ''
  }
}

const getters = {
  hosts (state) {
    return state.hosts
  },
  model (state) {
    return state.model
  },
  id (state) {
    return state.model.id
  },
  host (state) {
    return state.model.host
  },
  userName (state) {
    return state.model.userName
  },
  pwd (state) {
    return state.model.pwd
  },
  description (state) {
    return state.model.description
  },
  domain (state) {
    return state.model.domain
  }
}

// define the possible mutations that can be applied to our state
const mutations = {
  EDIT_HOSTS (state, hosts) {
    state.hosts = hosts
  },
  EDIT_HOST (state, host) {
    state.model.host = host
  },
  EDIT_USERNAME (state, username) {
    state.model.userName = username
  },
  EDIT_PWD (state, pwd) {
    state.model.pwd = pwd
  },
  EDIT_DESCRIPTION (state, description) {
    state.model.description = description
  },
  EDIT_DOMAIN (state, domain) {
    state.model.domain = domain
  },
  SET_HOST_DETAILS (state, host) {
    state.model.id = host ? host.id : 0
    state.model.host = host ? host.host : ''
    state.model.userName = host ? host.userName : ''
    state.model.pwd = host ? host.pwd : ''
    state.model.description = host ? host.description : ''
    state.model.domain = host ? host.domain : ''
  },
  DELETE_HOST (state, host) {
    axios.delete(`${appConfig.baseUrl}/hosts/${host.id}`)
    .then(function (response) {
      let reduced = state.hosts.reduce(function (reducedArray, item) {
        if (item.id !== host.id) {
          reducedArray.push(item)
        }
        return reducedArray
      }, [])
      state.hosts = reduced
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  ADD_HOST (state, host) {
    axios.post(`${appConfig.baseUrl}/hosts`, { 'host': host })
    .then(function (response) {
      let reduced = state.hosts.reduce(function (reducedArray, item) {
        reducedArray.push(item)
        return reducedArray
      }, [])
      reduced.push(response.data.host)
      state.hosts = reduced
    }, function (error) {
      console.log(error)
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  UPDATE_HOST (state, host) {
    axios.put(`${appConfig.baseUrl}/hosts/${host.id}`, { 'host': host })
    .then(function (response) {
      let reduced = state.hosts.reduce(function (reducedArray, item) {
        if (item.id === response.data.host.id) {
          reducedArray.push(response.data.host)
        } else {
          reducedArray.push(item)
        }
        return reducedArray
      }, [])
      state.hosts = reduced
    }, function (error) {
      console.log(error)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

const actions = {
  addHost (context, host) {
    context.commit('ADD_HOST', host)
  },
  updateHost (context, host) {
    context.commit('UPDATE_HOST', host)
  },
  deleteHost (context, host) {
    context.commit('DELETE_HOST', host)
  }
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
