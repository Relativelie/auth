import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export function showError(error: unknown) {
  if (error instanceof AxiosError) {
    toast.error(error.message);
  } else {
    toast.error('Something went wrong. Please try again later.');
  }
}
