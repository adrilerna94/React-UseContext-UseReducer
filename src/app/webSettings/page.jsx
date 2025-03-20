import { Typography } from '@/components/ui';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { SettingsHandler } from './components/SettingsHandler';

export default function WebSettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ThemeSwitcher />
      <SettingsHandler />
    </div>
  );
}
