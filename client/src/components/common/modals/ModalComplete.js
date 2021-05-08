import "./ModalDelete.css";

const ModalComplete = ({showModal, closeModal, completeHandler, children, id}) => {
    const showHideClassName = showModal ? "modal show" : "modal hide";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <div className="modal-buttons">
                    <button className="complete" onClick={() => completeHandler(id)}>Yes</button>
                    <button className="cancel" onClick={closeModal}>No</button>
                </div>
            </section>
        </div>
    );
};

export default ModalComplete;