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
                <label className="block text-slate-600 mb-2" htmlFor={name}>
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
                className={`w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
            />
        </div>
    );
};

export default Input;