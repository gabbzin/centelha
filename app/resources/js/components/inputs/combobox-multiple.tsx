import * as React from 'react'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '../ui/combo-box'

const tagsNecessidades = [
  'Cesta Básica',
  'Auxílio Gás',
  'Bolsa Família',
  'Auxílio Brasil',
  'Kit Higiene',
]
export function ComboboxMulti() {
  const [value, setValue] = React.useState<string[]>([])
  return (
    <Combobox
      items={tagsNecessidades}
      multiple
      onValueChange={setValue}
      value={value}
    >
      <ComboboxChips className={'border border-border'}>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput
          placeholder={value.length > 0 ? '' : 'Adicione uma categoria'}
        />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>Itens não encontrados</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
