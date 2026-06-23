export type ControlPointSearchParams = {
  guideName: string
  category: string
  attribute: string
  point: string
}

export type ControlPointData = {
  guideName: string
  categoryLabel: string
  point: string
  attribute: string
} & CommonTableData

export type ControlPointFormData = {
  guideId: string
  category: string
  point: string
  attribute: string
}

export type ControlPointItemSearchParams = {
  item: string
  obj: string
}

export type ControlPointItemData = {
  pointName: string
  item: string
  obj: string
  method: string
  judge: string
  interpret: string
  expected: string
  gradeLabel: string
  methods: []
} & CommonTableData

export type ControlPointItemFormData = {
  pointId: string
  grade: string
  item: string
  obj: string
  judge: string
  interpret: string
  methods: Array<{ content: string; expected: string }>
}
