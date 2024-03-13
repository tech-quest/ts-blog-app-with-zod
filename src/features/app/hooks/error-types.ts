import { FieldError } from '~/app/(unique)/admin/field-error-types';

export type Error = {
  code: string;
  message: string;
  fields: FieldError | null;
};
