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
    ip: '',
    sql_user_name: '',
    sql_pwd: '',
    description: '',
    domain: '',
    company_logo: '',
    port: 0
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
  ip (state) {
    return state.model.ip
  },
  sql_user_name (state) {
    return state.model.sql_user_name
  },
  sql_pwd (state) {
    return state.model.sql_pwd
  },
  description (state) {
    return state.model.description
  },
  domain (state) {
    return state.model.domain
  },
  company_logo (state) {
    return state.model.company_logo
  },
  port (state) {
    return state.model.port
  }
}

// define the possible mutations that can be applied to our state
const mutations = {
  EDIT_HOSTS (state, hosts) {
    state.hosts = hosts
  },
  EDIT_IP (state, ip) {
    state.model.ip = ip
  },
  EDIT_PORT (state, port) {
    state.model.port = port
  },
  EDIT_SQL_USER_NAME (state, sql_user_name) {
    state.model.userName = sql_user_name
  },
  EDIT_SQL_PWD (state, sql_pwd) {
    state.model.sql_pwd = sql_pwd
  },
  EDIT_DESCRIPTION (state, description) {
    state.model.description = description
  },
  EDIT_DOMAIN (state, domain) {
    state.model.domain = domain
  },
  EDIT_COMPANY_LOGO (state, location) {
    state.model.company_logo = location
  },
  SET_HOST_DETAILS (state, host) {
    state.model.id = host ? host.id : 0
    state.model.ip = host ? host.ip : ''
    state.model.sql_user_name = host ? host.sql_user_name : ''
    state.model.sql_pwd = host ? host.sql_pwd : ''
    state.model.description = host ? host.description : ''
    state.model.domain = host ? host.domain : ''
    state.model.company_logo = host ? host.company_logo : ''
    state.model.port = host ? host.port : 0
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
