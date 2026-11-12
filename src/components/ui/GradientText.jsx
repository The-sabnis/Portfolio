export default function GradientText({
  children,
  className = '',
  from = '#ffffff',
  via = '#d2d2d7',
  to = '#86868b',
  as: Tag = 'span',
  style = {},
}) {
  const background = via
    ? `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`
    : `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;

  return (
    <Tag
      className={`inline-block font-bold tracking-tight ${className}`}
      style={{
        backgroundImage: background,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
