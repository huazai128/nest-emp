import { resolve } from 'path'
import { readFileSync } from 'fs'
import { isString } from 'lodash'
import handlebars from 'handlebars'
import { Request } from 'express'
import { decodeMd5 } from './util'

export const renderHtml = () => {
    const filePath = resolve(__dirname, "../../client/index.html")
    return
}