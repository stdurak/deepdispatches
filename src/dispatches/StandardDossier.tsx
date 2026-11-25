import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function StandardDossier({ article }: { article: any }) {
  return (
    <>
      {/* ARTICLE HEADER */}
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00]">
          <span>{article.number}</span>
          {article.category && (
            <>
              <span>·</span>
              <span>{article.category}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-lg text-[#CCFF00]/90 font-light italic">
            {article.subtitle}
          </p>
        )}
        <div className="text-xs text-slate-500 font-mono pt-2 border-b border-slate-800/80 pb-6 flex items-center gap-4">
          {article.readTime && <span>Reading Time: {article.readTime}</span>}
          {article.status && (
            <>
              <span>·</span>
              <span>Status: {article.status}</span>
            </>
          )}
        </div>
      </div>

      {/* HERO COVER PHOTO */}
      {article.image && (
        <div className="max-w-5xl mx-auto px-4 md:px-6 mt-12">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#081630] min-h-[350px] md:min-h-[550px] flex items-center justify-center">
            <img
              src={article.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none"
            />
            <img
              src={article.image}
              alt={article.title}
              className="relative z-10 max-h-[600px] w-auto max-w-full object-contain mx-auto my-auto shadow-2xl py-4"
            />
          </div>
        </div>
      )}

      {/* RICH TEXT ARTICLE BODY */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert prose-lg text-slate-300 font-light leading-relaxed space-y-6 mt-12 pb-20 prose-headings:text-white prose-headings:font-bold prose-a:text-[#CCFF00] prose-strong:text-white prose-blockquote:border-l-[#CCFF00] prose-blockquote:text-slate-200">
        {article.body ? (
          <TinaMarkdown content={article.body} />
        ) : (
          <p>{article.summary}</p>
        )}
      </div>
    </>
  );
}
