import "./Modal.css";

const Modal = ({showModal, closeModal, deleteModal, children, id}) => {
    const showHideClassName = showModal ? "modal show" : "modal hide";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={() => deleteModal(id)}>Yes</button>
                <button onClick={closeModal}>No</button>
            </section>
        </div>
    );
};

export default Modal;