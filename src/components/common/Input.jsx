// src/components/common/Input.jsx
import React from 'react';

const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    label,
    className = '',
    required = false,
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-light-300 mb-2" htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`input ${className}`}
            />
        </div>
    );
};

export default Input;