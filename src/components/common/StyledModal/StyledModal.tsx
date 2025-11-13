import React from 'react'
import { Modal, ModalProps } from 'antd'

type Props = ModalProps & {
  compact?: boolean
}

const StyledModal: React.FC<Props> = ({
  compact = true,
  className,
  wrapClassName,
  ...rest
}) => {
  const mergedClass =
    `${className || ''} ${compact ? 'modal--compact' : ''}`.trim()
  const mergedWrap = `${wrapClassName || ''} modal--pink`.trim()
  return <Modal className={mergedClass} wrapClassName={mergedWrap} {...rest} />
}

export default StyledModal
