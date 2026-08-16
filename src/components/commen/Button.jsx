
const defaultClassName = "shrink-0 inline-flex items-center justify-center rounded-lg transition-opacity";

export function Button({ children, backgroundColor="none", color="none", border="none",
                         className="", disabled=false, onClick, type="button", }) {

    const cursor = disabled?"not-allowed":"pointer"
    return (
        <button
        disabled={disabled}
        className={`${defaultClassName} ${className}`}
        style={{ backgroundColor, color, border, cursor}}
        type={type}
        onClick={onClick}
        >
        {children}
        </button>
    );
}
