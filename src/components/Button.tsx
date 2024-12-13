import React from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  gradientDuoTone?: 'purple' | 'blue' | 'green' | 'cyan' | 'pink' | 'teal';
  as?: React.ElementType;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  gradientDuoTone,
  className = '',
  disabled,
  as: Component = 'button',
  to,
  ...props
}) => {
  const getColor = () => {
    switch (variant) {
      case 'primary':
        return 'blue';
      case 'secondary':
        return 'gray';
      case 'outline':
        return 'light';
      default:
        return 'blue';
    }
  };

  const buttonContent = (
    <>
      {isLoading ? (
        <>
          <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </>
  );

  if (Component === Link || to) {
    const LinkComponent = Component === Link ? Component : Link;
    return (
      <LinkComponent to={to || ''} className={`inline-block ${className}`}>
        <FlowbiteButton
          size={size}
          color={getColor()}
          gradientDuoTone={gradientDuoTone}
          outline={variant === 'outline'}
          disabled={disabled || isLoading}
          {...props}
        >
          {buttonContent}
        </FlowbiteButton>
      </LinkComponent>
    );
  }

  return (
    <FlowbiteButton
      size={size}
      color={getColor()}
      gradientDuoTone={gradientDuoTone}
      outline={variant === 'outline'}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {buttonContent}
    </FlowbiteButton>
  );
};