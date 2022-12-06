export default (val: any): val is string => typeof val === 'string' || val instanceof String
