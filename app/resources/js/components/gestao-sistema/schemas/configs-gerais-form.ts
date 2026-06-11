import z from 'zod';

// Zod Schema
export const configsGeraisSchema = z.object({
  platformName: z
    .string()
    .min(1, 'Nome da plataforma é obrigatório')
    .max(50, 'Nome da plataforma deve ter no máximo 50 caracteres'),
  slogan: z
    .string()
    .max(100, 'Slogan deve ter no máximo 100 caracteres')
    .optional(),
  footerText: z
    .string()
    .max(200, 'Texto do rodapé deve ter no máximo 200 caracteres')
    .optional(),
  font: z.string(),
  social_links: z
    .array(
      z.object({
        value: z
          .string()
          .max(255, 'Link deve ter no máximo 255 caracteres')
          .optional(),
      }),
    )
    .optional(),
  maintenance_mode: z.boolean().optional(),
});

// Tipagem do Schema
export type FormValues = z.infer<typeof configsGeraisSchema>;
