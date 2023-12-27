import Modal from "./Modal";

function Popup({ point, children }) {
    return (
        <Modal isVisible={point !== null}>
            {
                point &&
                <div style={{ position: "absolute", zIndex: 10, left: point.x, top: point.y }}>
                    {children}
                </div>
            }
        </Modal>
    );
}

export default Popup;