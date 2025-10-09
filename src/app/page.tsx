import { redirect } from 'next/navigation';
import { fallbackLocale } from '@/i18n/locales';

export default function RootRedirect() {
  redirect(`/${fallbackLocale}`);
}
