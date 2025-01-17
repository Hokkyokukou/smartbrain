import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {/* Condizione per evitare di rendere l'immagine con un src vuoto */}
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt=""
                        width="500px"
                        height="auto"
                        id="inputimage"
                    />
                )}
                {/* Renderizza la box solo se imageUrl è presente */}
                {imageUrl && (
                    <div
                        className="bounding-box"
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                        }}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default FaceRecognition;
