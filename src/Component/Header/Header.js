import { Link, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

const Header = (props) => {

    const navigate = useNavigate();

    const items = [
        { label: 'Home', command: () => { navigate('/') } },
    ];

    const start = <Link to="/"><img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2" /></Link>;
    const end = null; //<InputText placeholder="Search" type="text" className="w-full" />;

    return (
        <>
            <div className="card">
                <Menubar model={items} start={start} end={end} />
            </div>
        </>
    );
};

export default Header;