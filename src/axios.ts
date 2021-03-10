import { AxiosStatic, AxiosRequestConfig } from '../types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import mergeConfig from './core/mergeConfig'
import defaults from './core/defaults'


function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

console.log(axios)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios