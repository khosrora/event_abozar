/**
 * Badge Component
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantClasses = {
    default: '',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    ghost: 'badge-ghost',
    outline: 'badge-outline',
  };

  const sizeClasses = {
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
  };

  return (
    <span
      className={`badge ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
