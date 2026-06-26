import { Head, usePage } from '@inertiajs/react'
import { CircleDollarSignIcon, IdCardIcon, MapPinHouseIcon } from 'lucide-react'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import type { Family, SharedData } from '@/types'
import { FamilyForm } from './family-form'

const STEPS = [
  { icon: IdCardIcon, title: '01 Identificação e Familia' },
  { icon: MapPinHouseIcon, title: '02 Endereço' },
  { icon: CircleDollarSignIcon, title: '03 Renda' },
]
interface EditFamilyPageProps {
  family: Family
}
export default function EditFamilyPage({ family }: EditFamilyPageProps) {
  const { pageSettings } = usePage<SharedData>().props
  const texts = (pageSettings?.texts as Record<string, string>) ?? {}
  const [currentStep, setCurrentStep] = useState(0)
  return (
    <>
      <Head title={texts.edit_title ?? 'Editar Família'} />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[16%_1fr]">
          <aside className="bg-surface border-border hidden lg:flex h-full flex-col gap-4 border-r pt-6">
            <h3 className="text-center text-sm text-[#737781] uppercase">
              Etapas do cadastro
            </h3>

            {STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 ${index === currentStep ? 'bg-[#094785] font-bold text-white' : 'hover:bg-muted'}`}
              >
                <step.icon className="size-6" />
                <span className="text-xs">{step.title}</span>
              </div>
            ))}
          </aside>

          <main className="bg-surface flex h-full flex-col justify-between p-8">
            <FamilyForm
              family={family}
              onNext={() => setCurrentStep((s) => s + 1)}
              onPrev={() => setCurrentStep((s) => s - 1)}
              step={currentStep}
              totalSteps={STEPS.length}
            />
          </main>
        </div>
      </div>
    </>
  )
}
