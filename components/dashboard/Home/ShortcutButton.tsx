import React, { ReactNode, ButtonHTMLAttributes } from 'react';


interface ShortcutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const ShortcutButton: React.FC<ShortcutButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="border border-transparent rounded-3xl transition ease-in-out delay-150 hover:border-teal active:border-teal hover:text-teal active:text-teal items-center p-1 px-4 bg-baby-lime"
            {...props}
        >
            <span className="text-sm font-normal">
                {children}
            </span>
        </button>
    );
}
