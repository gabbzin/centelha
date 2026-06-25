import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import type { PageSchema } from '@/types'

interface SettingsFormProps {
  schema: PageSchema
  settings: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}

export function SettingsForm({
  schema,
  settings,
  onChange,
}: SettingsFormProps) {
  const getValue = (key: string) => {
    const parts = key.split('.')
    let current: unknown = settings
    for (const part of parts) {
      if (current && typeof current === 'object') {
        current = (current as Record<string, unknown>)[part]
      } else {
        return undefined
      }
    }
    return current
  }

  return (
    <div className="space-y-8">
      {schema.sections.map((section) => (
        <section key={section.title}>
          <div className="mb-4">
            <h3 className="text-heading text-lg font-semibold">
              {section.title}
            </h3>
            {section.description && (
              <p className="text-muted-foreground text-sm">
                {section.description}
              </p>
            )}
          </div>
          <div className="space-y-4">
            {section.fields.map((field) => {
              const val = getValue(field.key)

              if (field.type === 'boolean') {
                return (
                  <div
                    key={field.key}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <Label className="text-heading text-sm font-medium">
                      {field.label}
                    </Label>
                    <Switch
                      checked={!!val}
                      onCheckedChange={(checked: boolean) =>
                        onChange(field.key, checked)
                      }
                    />
                  </div>
                )
              }

              if (field.type === 'textarea') {
                return (
                  <div key={field.key} className="grid gap-1.5">
                    <Label className="text-heading text-xs font-semibold">
                      {field.label}
                    </Label>
                    <Textarea
                      maxLength={field.max}
                      rows={3}
                      value={String(val ?? '')}
                      onChange={(e) => onChange(field.key, e.target.value)}
                    />
                  </div>
                )
              }

              if (field.type === 'number') {
                return (
                  <div key={field.key} className="grid gap-1.5">
                    <Label className="text-heading text-xs font-semibold">
                      {field.label}
                    </Label>
                    <Input
                      type="number"
                      min={field.min}
                      max={field.max}
                      value={Number(val) || 0}
                      onChange={(e) =>
                        onChange(field.key, Number(e.target.value))
                      }
                    />
                  </div>
                )
              }

              return (
                <div key={field.key} className="grid gap-1.5">
                  <Label className="text-heading text-xs font-semibold">
                    {field.label}
                  </Label>
                  <Input
                    type="text"
                    maxLength={field.max}
                    value={String(val ?? '')}
                    onChange={(e) => onChange(field.key, e.target.value)}
                  />
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
