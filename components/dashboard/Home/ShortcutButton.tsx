export const ShortcutButton = ({ children, ...props }) => {
    return (
        <button className="border border-transparent rounded-3xl hover:border-teal active:border-teal  hover:text-teal active:text-teal items-center p-1 px-4 bg-baby-lime" {...props}>
             <span className="text-sm font-normal">
            {children}
            </span>
        </button>
    )
}