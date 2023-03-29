import * as Types from '../../constants/ActionType';


export const actShowLoading = () => {
  const status = true
  return {
    type: Types.SHOWLOADING,
    status
  }
}
export const actHiddenLoading = () => {
  const status = false
  return {
    type: Types.HIDDENLOADING,
    status
  }
}

