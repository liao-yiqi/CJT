export type CommonTestEnvironmentsSearchParams = {
  name: string
}

export type CommonTestEnvironmentsData = {
  name: string
  system: string
  env: string
} & CommonTableData

export type CommonTestEnvironmentsFormData = {
  name: string
  system: string
  env: string
}
