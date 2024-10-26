import { z } from "zod"

export const AddressSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
})

export type AddressFormData = z.infer<typeof AddressSchema>