interface StatusMessageProps {
    type: 'loading' | 'error' | 'empty';
    text: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function StatusMessage({ type, text, actionLabel, onAction }: StatusMessageProps) {
    return (
        <div className={`status status-${type}`}>
            {type === 'loading' && <span className="spinner" aria-hidden="true" />}
            <p>{text}</p>
            {actionLabel && onAction && (
                <button type="button" className="btn btn-secondary" onClick={onAction}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
