import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt
                className="Tilt br2 shadow-2"
                options={{ max: 55 }} //max tilt rotation (degrees)
                style={{ height: 150, width: 150 }}
            >
                <div className="pa3">
                    <img
                        style={{ paddingTop: '5px' }}
                        src={brain}
                        alt="logo"
                    />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
