interface HeaderProps {
    postsCount: number;
}

export default function Header({ postsCount }: HeaderProps) {
    return (
        <header className="header">
            <h1>Барахолка</h1>
            <span className="header-badge">Объявлений: {postsCount}</span>
        </header>
    );
}
