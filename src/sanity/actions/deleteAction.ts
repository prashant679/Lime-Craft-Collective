import { useState } from 'react'
import { useDocumentOperation } from 'sanity'
import type { DocumentActionComponent } from 'sanity'
import { TrashIcon } from '@sanity/icons'

export const CustomDeleteAction: DocumentActionComponent = (props) => {
  const { delete: deleteOp } = useDocumentOperation(props.id, props.type)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // Do not show Delete for siteSettings singleton
  if (props.type === 'siteSettings') {
    return null
  }

  return {
    label: isDeleting ? 'Deleting...' : 'Delete',
    icon: TrashIcon,
    tone: 'critical',
    disabled: Boolean(deleteOp.disabled),
    onHandle: () => {
      setIsConfirmOpen(true)
    },
    dialog: isConfirmOpen && {
      type: 'confirm',
      message: 'Are you sure you want to delete this item permanently from Sanity?',
      onConfirm: () => {
        setIsDeleting(true)
        deleteOp.execute()
        props.onComplete()
      },
      onCancel: () => {
        setIsConfirmOpen(false)
      },
    },
  }
}
