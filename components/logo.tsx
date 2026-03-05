import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center">
      <Image src="/favicon.svg" alt="Elexvx" width={140} height={28} className="h-7 w-auto" />
    </div>
  );
}
