import React from 'react';

const Button = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    size = 'md',
    isLoading = false,
    variant = 'primary',
    fullWidth = false,
    className = '',
    icon,
    ...props
}) => {
    const baseClasses = 'btn';

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    const variantClasses = {
        primary: 'btn',
        inactive: 'inactive',
        success: 'success',
        info: 'info',
        warning: 'warning',
    };

    const sizeClasses = fullWidth ? 'w-full' : '';
    const disabledClasses = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${disabledClasses} ${sizes[size]} ${className} flex items-center justify-center`}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;