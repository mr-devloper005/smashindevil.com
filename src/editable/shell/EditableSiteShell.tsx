import type { ReactNode } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { smashLogoDataUrl } from '@/editable/components/SmashLogo'

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${dc.shell.page} flex min-h-screen flex-col ${className}`}>
      <link rel="icon" href={smashLogoDataUrl} />
      <link rel="shortcut icon" href={smashLogoDataUrl} />
      <link rel="apple-touch-icon" href={smashLogoDataUrl} />
      <EditableNavbar />
      <div className="min-h-0 flex-1">{children}</div>
      <EditableFooter />
    </div>
  )
}
