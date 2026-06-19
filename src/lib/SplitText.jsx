// Lightweight, dependency-free text splitter for GSAP reveals.
// Splits into lines (on \n) → words → chars, each wrapped in spans.
// Accessible: the real text is exposed via aria-label; spans are hidden.
export default function SplitText({ text, className = '', as: Tag = 'span' }) {
  const lines = String(text).split('\n')

  return (
    <Tag className={`split ${className}`} aria-label={text}>
      {lines.map((line, li) => (
        <span className="line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi, arr) => (
            <span className="word" key={wi}>
              {word.split('').map((ch, ci) => (
                <span className="char" key={ci}>
                  {ch}
                </span>
              ))}
              {wi < arr.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
