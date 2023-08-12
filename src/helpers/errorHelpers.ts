import { AxiosError } from 'axios';

export function isAxiosError(error: unknown): error is AxiosError {
  return !!(error as AxiosError).isAxiosError;
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}