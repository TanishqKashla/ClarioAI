import * as React from 'react';

// interface EmailTemplateProps {
//     firstName: string;
// }

export function EmailTemplate({ name }) {
    return (
        <div>
            <h1>Welcome, {name}!</h1>
        </div>
    );
}