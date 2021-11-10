interface ruleParams {
  page: number
  limit: number
  rule_name?: string
}

interface ruleList {
  id:number
  rule_name:string
  rule_value:string
  attr_name:string
  attr_value:string
}

interface ISpe {
  value: string
  detail:string[]
}

interface IFormData {
  rule_name: string
  spec: ISpe[]
}

interface IspeOne {
  value: string
  detail: string
}