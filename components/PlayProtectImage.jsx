'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PlayProtectImage() {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {!hasError && (
        <Image
          src="/screenshots/play-protect.png"
          alt="Google Play Protect verification"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 380px"
          onError={() => setHasError(true)}
        />
      )}
      {hasError && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-accent-cyan/10 to-transparent rounded-2xl p-6">
          <div className="text-5xl mb-4">🛡️</div>
          <div className="text-base text-accent-cyan font-semibold mb-2">
            Google Play Protect
          </div>
          <div className="text-xs text-txt-secondary text-center">
            App Verified as Safe
          </div>
          <div className="text-xs text-txt-muted mt-4 text-center leading-relaxed">
            Add play-protect.png to<br />/public/screenshots/
          </div>
        </div>
      )}
    </>
  );
}
