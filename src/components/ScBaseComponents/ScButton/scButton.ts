export interface ScButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | ''
  size?: 'large' | 'default' | 'small'
  plain?: boolean
  text?: boolean
  bg?: boolean
  link?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  icon?: string | object
  loadingIcon?: string | object
  autofocus?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  autoInsertSpace?: boolean
  color?: string
  dark?: boolean
  tag?: string | object
  stop?: boolean
  onClick?: (e: MouseEvent) => void | Promise<any>
}
