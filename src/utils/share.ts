/**
 * Reliable package sharing and link copying utility
 * Copies the package URL to the clipboard with fallbacks and invokes the Web Share API when supported.
 */

export interface ShareResult {
  copied: boolean;
  shared: boolean;
  url: string;
}

export async function sharePackage(params: {
  slug: string;
  name: string;
  duration?: string;
}): Promise<ShareResult> {
  const origin =
    typeof window !== 'undefined' && window.location?.origin && !window.location.origin.includes('null')
      ? window.location.origin
      : 'https://www.sikkimtourco.com';
  const url = `${origin}/packages/${params.slug}`;

  let copied = false;

  // 1. Modern navigator.clipboard API
  try {
    if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      copied = true;
    }
  } catch {
    copied = false;
  }

  // 2. Legacy fallback for older webviews or browsers
  if (!copied && typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {
      copied = false;
    }
  }

  // 3. Trigger Web Share API on mobile devices if supported
  let shared = false;
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: `${params.name} - Sikkim Tour Co.`,
        text: `Explore "${params.name}"${params.duration ? ` (${params.duration})` : ''} with Sikkim Tour Co. All meals, private car from Day 1 & all permits included:`,
        url,
      });
      shared = true;
    } catch {
      // User dismissed share dialog; copied remains true
    }
  }

  return { copied, shared, url };
}

