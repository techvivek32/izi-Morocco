import { Request, Response } from 'express'
import { AnyType } from '../types'

export const isWebsiteValid = (
  website: string
): { valid: boolean; url: string } => {
  try {
    const urlRegex =
      /(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    let urlWithProtocol = website.trim()
    if (!/^(?:f|ht)tps?:\/\//i.test(urlWithProtocol)) {
      urlWithProtocol = 'https://' + urlWithProtocol
    }
    const isValid = urlRegex.test(urlWithProtocol)
    return {
      valid: isValid,
      url: urlWithProtocol
    }
  } catch (error) {
    return {
      valid: false,
      url: website.trim()
    }
  }
}

export const setFieldsIntoLocals = (
  res: Response,
  fields: Record<string, AnyType>
): void => {
  res.locals.shared = {
    ...(res.locals.shared || {}),
    ...fields
  }
}

export const getFieldIntoReq = (req: Request, fieldName: string) => {
  let value = undefined
  if (req.params && fieldName in req.params) {
    value = req.params[fieldName]
  } else if (req.body && fieldName in req.body) {
    value = req.body[fieldName]
  } else if (req.query && fieldName in req.query) {
    value = req.query[fieldName]
  }
  return value
}

export const removeExtraFieldFormObject = (
  data: AnyType,
  field: string[],
  removeNullFields: boolean = false,
  preventFalsyValue: (false | undefined | null | 0 | '')[] = [] // prevent the values to removed from object as falsyValue
) => {
  const obj = Object.assign({}, data)
  const keys = Object.keys(obj)
  keys.forEach((e: string) => {
    if (!removeNullFields) {
      if (!field.includes(e)) delete obj[e]
    } else {
      if (
        !field.includes(e) ||
        (!preventFalsyValue.includes(obj[e]) && !obj[e])
      )
        delete obj[e]
    }
  })
  return obj
}
