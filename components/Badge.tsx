const Badge = ({ children }: { children: string }) => {
  return (
    <span className="ds-badge">
      <span>{children}</span>
    </span>
  );
};

export default Badge;
