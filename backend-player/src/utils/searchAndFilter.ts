import { AnyType, DynamicObjectType } from '../types'
import { Request } from 'express'

const searchKeywordFilter = (message: string) => {
  if (!(typeof message === 'string' && message.trim())) {
    return ''
  }
  if (
    message.includes('$') ||
    message.includes('^') ||
    message.includes('*') ||
    message.includes('+') ||
    message.includes('[') ||
    message.includes('|') ||
    message.includes('(') ||
    message.includes(')') ||
    message.includes('?') ||
    message.includes('.') ||
    message.includes('\\') ||
    message.includes('/') ||
    message.includes('%')
  ) {
    const msg = message.replace(/[$%^*()|+?.\\[\]\\/]/gi, '\\$&')
    return msg
  }
  let keyword = ''
  try {
    keyword = decodeURIComponent(message)
  } catch (_err) {
    return ''
  }
  if (
    keyword.includes('$') ||
    keyword.includes('^') ||
    keyword.includes('*') ||
    keyword.includes('+') ||
    keyword.includes('[') ||
    keyword.includes('|') ||
    keyword.includes('(') ||
    keyword.includes(')') ||
    keyword.includes('?') ||
    keyword.includes('.') ||
    keyword.includes('\\') ||
    keyword.includes('/') ||
    message.includes('%')
  ) {
    const msg = keyword.replace(/[$%^*()|+?.\\[\]\\/]/gi, '\\$&')
    return msg
  }
  return keyword
}

export const keywordSearchHelper = (
  fieldsName: string[],
  searchTerm: string
) => {
  const searchterms: { [key: string]: AnyType }[] = []
  if (!searchTerm || !fieldsName.length) return {}
  fieldsName.forEach((field) => {
    const searchField: { [key: string]: AnyType } = {}
    searchField[field] = {
      $regex: `${searchKeywordFilter(searchTerm)}`,
      $options: 'i'
    }
    searchterms.push(searchField)
  })
  return searchterms.length ? { $or: searchterms } : {}
}

const checkFilterType = (type: string, value: AnyType) => {
  if (type === 'number') {
    const isNotValidNum = isNaN(value)
    if (isNotValidNum) return { valid: false }
    return {
      valid: true,
      value: Number(value)
    }
  } else if (type === 'boolean') {
    if (value === true || value === 'true') return { valid: true, value: true }
    if (value === false || value === 'false')
      return { valid: true, value: false }
  }
  return {
    valid: false
  }
}

export const filterSearchHelper = (
  fields: { [key: string]: AnyType },
  applyAndCondition: boolean = false
) => {
  const filterObject: { [key: string]: AnyType }[] = []
  let isValid = true
  let inValidFilters = ''

  Object.keys(fields).forEach((field) => {
    if (!field || !fields[field] || !fields[field].value) return
    if (fields[field].prefix) {
      fields[`${fields[field].prefix}.${field}`] = fields[field]
      field = `${fields[field].prefix}.${field}`
    }
    const { value, type = 'string', multi } = fields[field]
    if (!multi || (multi && value.split(',').length < 2)) {
      const result =
        type === 'string'
          ? { valid: true, value }
          : checkFilterType(type, value)
      if (!result.valid) {
        isValid = false
        inValidFilters = inValidFilters ? `, ${field}` : field
        return
      }
      fields[field].value = result.value
    } else {
      const allValues: string[] = value.split(',')
      fields[field].value = []
      allValues.forEach((individualvalue) => {
        if (!isValid) return
        const result =
          type === 'string'
            ? { valid: true, value: individualvalue }
            : checkFilterType(type, individualvalue)
        if (!result.valid) {
          isValid = false
          inValidFilters = inValidFilters ? `, ${field}` : field
          return
        }
        const data = fields[field].value
        data.push(result.value)
        fields[field].value = data
      })
      fields[field].value =
        fields[field].value.length > 1
          ? { $in: fields[field].value }
          : fields[field].value[0] || ''
    }

    filterObject.push({ [field]: fields[field].value })
  })

  return {
    valid: isValid,
    invalidNames: inValidFilters,
    filterData:
      filterObject.length > 1
        ? { [applyAndCondition ? '$and' : '$or']: filterObject }
        : filterObject[0] || {}
  }
}

export const assignConditions = (
  condition: DynamicObjectType,
  filterCondition: DynamicObjectType,
  searchCondition: DynamicObjectType
) => {
  if (
    Object.keys(filterCondition || {}).length &&
    Object.keys(searchCondition || {}).length
  ) {
    Object.assign(condition, {
      $and: [filterCondition, searchCondition]
    })
  } else if (Object.keys(filterCondition || {}).length)
    Object.assign(condition, { ...(filterCondition || {}) })
  else if (Object.keys(searchCondition || {}).length)
    Object.assign(condition, { ...(searchCondition || {}) })
}

export function assignDateRangeCondition(
  condition: DynamicObjectType,
  field: string,
  startDate?: AnyType,
  endDate?: AnyType
) {
  if (!startDate || !endDate) return

  const dateConditions = [
    { [field]: { $gte: startDate } },
    { [field]: { $lte: endDate } }
  ]

  if (Array.isArray(condition.$and)) {
    condition.$and.push(...dateConditions)
  } else if (condition.$and) {
    // If $and exists but is not an array (edge case)
    condition.$and = [condition.$and, ...dateConditions]
  } else {
    condition.$and = dateConditions
  }
}

export const getPagination = (req: Request) => {
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.max(1, Number(req.query.limit) || 10)

  return { page, limit }
}

export const getPaginationResults = (
  page: number,
  limit: number,
  totalRecords: number
) => {
  return {
    currentPage: page,
    pageLimit: limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit)
  }
}
