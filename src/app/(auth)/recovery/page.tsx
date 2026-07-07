'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Input, Label } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useActionState, startTransition } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ResetPasswordPage() {
  const router = useRouter();
  // const supabase = createClientComponentClient();

  // Керування кроками: 1 - Email, 2 - Код, 3 - Новий пароль
  const [step, setStep] = useState<1 | 2 | 3>(3);
  const [isLoading, setIsLoading] = useState(false);

  // Дані форм
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  // КРОК 1: Відправка коду на пошту
  // const handleSendCode = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email) return;

  //   setIsLoading(true);
  //   const { error } = await supabase.auth.resetPasswordForEmail(email);
  //   setIsLoading(false);

  //   if (error) {
  //     // toast.error('Помилка відправки. Перевірте email.');
  //   } else {
  //     // toast.success('Код відправлено на пошту!');
  //     setStep(2);
  //   }
  // };

  // КРОК 2: Перевірка 6-значного коду
  // const handleVerifyCode = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (token.length !== 6) {
  //     // toast.error('Код має містити 6 цифр');
  //     return;
  //   }

  //   setIsLoading(true);
  //   const { error } = await supabase.auth.verifyOtp({
  //     email,
  //     token,
  //     type: 'recovery',
  //   });
  //   setIsLoading(false);

  //   if (error) {
  //     // toast.error('Невірний код. Спробуйте ще раз.');
  //   } else {
  //     // toast.success('Код прийнято!');
  //     setStep(3);
  //   }
  // };

  // КРОК 3: Збереження нового пароля
  // const handleUpdatePassword = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (password.length < 6) {
  //     // toast.error('Пароль має бути не коротше 6 символів');
  //     return;
  //   }

  //   setIsLoading(true);
  //   const { error } = await supabase.auth.updateUser({ password });
  //   setIsLoading(false);

  //   if (error) {
  //     // toast.error('Помилка при оновленні пароля');
  //   } else {
  //     // toast.success('Пароль успішно змінено!');
  //     await supabase.auth.signOut({ scope: 'others' });
  //     router.push('/login');
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-3 px-6 py-5 items-center">
          <Image width={80} height={70} src="/mascot.png" alt="logo" />
          <p className="text-[65px] font-bold">Akkta</p>
        </div>
      </div>

      <div className="bg-white w-full max-w-[440px] p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
        {/* Заголовки змінюються залежно від кроку */}
        <h1 className="text-2xl font-bold text-center text-[#1E293B] mb-2">
          {step === 1 && 'Відновлення пароля'}
          {step === 2 && 'Введіть код'}
          {step === 3 && 'Новий пароль'}
        </h1>
        <p className="text-[#64748B] text-center mb-8 text-[15px]">
          {step === 1 &&
            'Введіть свою пошту, щоб отримати інструкції для відновлення пароля'}
          {step === 2 && (
            <>
              Ми відправили 6-значний код на <br />
              <span className="font-semibold text-[#1E293B]">{email}</span>
            </>
          )}
          {step === 3 && 'Придумайте надійний пароль для вашого акаунту'}
        </p>

        {/* Форма Кроку 1 */}
        {step === 1 && (
          <form className="space-y-5 mb-4" onSubmit={() => {}}>
            <div className="space-y-1.5">
              <Label
                className="text-sm font-semibold text-[#1E293B] ml-0.5"
                htmlFor="email"
              >
                Пошта
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                disabled={isLoading}
              />
            </div>
            <SubmitButton isLoading={isLoading} text="Відправити код" />
          </form>
        )}

        {/* Форма Кроку 2 */}
        {step === 2 && (
          <form className="space-y-5 mb-4" onSubmit={() => {}}>
            <div className="space-y-1.5">
              <Label
                className="text-sm font-semibold text-[#1E293B] ml-0.5"
                htmlFor="token"
              >
                Код з листа
              </Label>
              <Input
                id="token"
                type="text"
                required
                maxLength={6}
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))} // Тільки цифри
                placeholder="------"
                className="text-center text-2xl tracking-[0.5em] font-mono"
                disabled={isLoading}
              />
            </div>
            <SubmitButton isLoading={isLoading} text="Підтвердити" />
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-[#64748B] hover:text-[#1E293B] mt-2 transition-colors"
            >
              Змінити email
            </button>
          </form>
        )}

        {/* Форма Кроку 3 */}
        {step === 3 && (
          <form className="space-y-5 mb-4" onSubmit={() => {}}>
            <div className="space-y-1.5">
              <Label
                className="text-sm font-semibold text-[#1E293B] ml-0.5"
                htmlFor="password"
              >
                Новий пароль
              </Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Мінімум 6 символів"
                disabled={isLoading}
              />
            </div>
            <SubmitButton isLoading={isLoading} text="Зберегти пароль" />
          </form>
        )}

        {/* Footer (показуємо тільки на 1 кроці) */}
        {step === 1 && (
          <p className="text-center text-[15px] text-[#64748B] mt-6">
            Згадали пароль?
            <Link
              href="/login"
              className="text-[#3170D4] font-semibold hover:underline ml-2"
            >
              Увійти
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

// Виніс кнопку в окремий міні-компонент, щоб не дублювати код градієнта та лоадера
function SubmitButton({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text: string;
}) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="bg-gradient-to-r w-full mx-auto flex justify-center items-center from-[#4481eb] to-[#2762d9] hover:from-[#3b74e0] hover:to-[#1e53c9] rounded-xl p-4 text-white shadow-md transition-colors duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
          Обробка...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
