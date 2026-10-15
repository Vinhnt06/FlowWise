import { files } from '@/content/landing';

/**
 * Files it reads — "Two-ended rows, narrow column": name on the left, what it needs on the right.
 */
export default function FileList() {
  return (
    <section id="files" aria-label={files.heading} className="bg-bg-surface-elevated px-4 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-[560px] lg:ml-[22%]">
        <h2 className="font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary" data-rise>
          {files.heading}
        </h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-text-primary" data-rise="2">{files.formats}</p>

        {files.groups.map((group) => (
          <div key={group.label} className="mt-10" data-rise>
            <p className="text-[16px] text-text-secondary">{group.label}</p>
            <ul className="mt-2">
              {group.rows.map((row) => {
                const href = 'href' in row ? (row.href as string) : undefined;
                const content = (
                  <>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span className={`text-[16px] text-text-primary ${href ? 'link-under' : ''}`}>{row.name}</span>
                    </span>
                    <span className="text-right text-[13px] tabular-nums text-text-secondary">{row.value}</span>
                  </>
                );
                return (
                  <li key={row.name + row.value}>
                    {href ? (
                      <a href={href} download className="flex min-h-[44px] items-center justify-between gap-6 sm:min-h-[38px]">
                        {content}
                      </a>
                    ) : (
                      <div className="flex min-h-[44px] items-center justify-between gap-6 sm:min-h-[38px]">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
