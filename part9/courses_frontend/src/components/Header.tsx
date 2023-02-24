interface HeaderProps {
    courseName: string
}
const Header = ({courseName}: HeaderProps) => <h1>{courseName}</h1>

export default Header;