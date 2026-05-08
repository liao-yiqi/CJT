import request from '@/utils/request'

/**
 * @description 查询字典数据列表
 */
export const getDictListData = () => {
  return request.get({ url: '/system/dict/data/list' })
}

/**
 * @description 查询字典详情数据
 */
export const getDictDetailData = (dictCode: string) => {
  return request.get({ url: `/system/dict/data/${dictCode}` })
}

/**
 * @description 根据字典类型查询字典数据信息
 */
export const getDictDataByDictType = (dictType: string) => {
  return request.get<DataResponse<Array<DictData>>>({ url: `/system/dict/data/type/${dictType}` })
}
